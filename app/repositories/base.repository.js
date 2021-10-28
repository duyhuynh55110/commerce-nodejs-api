const {
  PAGINATE_LIMIT_DEFAULT,
  PAGINATE_FIRST_PAGE,
  SORT_ASC,
} = require("@lib/constants");

const mongoose = require("mongoose");
const { isEmptyObj } = require("@common");
const { options } = require("joi");

class BaseRepository {
  // Define what model for this repo
  setModel(model) {
    this.model = model;
  }

  // get all
  all() {
    return this.model.find({});
  }

  // get doc by _id
  getDocById(id, select = null) {
    let query = [
      {
        $match: { _id: mongoose.Types.ObjectId(id) },
      },
    ];

    // Select define field (get all field if not)
    if (select) {
      query.push({
        $project: select,
      });
    }

    return this.model.aggregate(query);
  }

  // get docs and paginate
  paginate({
    select = null,
    match = {},
    limit = PAGINATE_LIMIT_DEFAULT,
    page = PAGINATE_FIRST_PAGE,
    sort = {
      _id: SORT_ASC,
    },
    options = [],
  }) {
    limit = parseInt(limit);
    page = parseInt(page);
    let skip = (page - 1) * limit;

    let data = this._setDataPaginate(select, match, skip, limit, sort, options);
    let metaData = this._setMetaDataPaginate(match, limit, page);

    return this.model.aggregate([
      {
        $facet: {
          data: data,
          meta_data: metaData,
        },
      },
      {
        $project: {
          data: 1,
          meta_data: {
            $arrayElemAt: ["$meta_data", 0],
          },
        },
      },
    ]);
  }

  // Config 'meta_data' field
  _setMetaDataPaginate(match, limit, page) {
    return [
      {
        $match: match,
      },
      { $count: "total" },
      {
        // add field to calculator paginate inform
        $addFields: {
          per_page: limit,
          current_page: page,
          total_pages: {
            $ceil: {
              $divide: ["$total", limit],
            },
          },
        },
      },
      {
        $project: {
          // Manage return fields
          total: 1,
          total_pages: 1,
          current_page: 1,
          per_page: 1,
          next_page: {
            $cond: {
              if: { $lt: ["$current_page", "$total_pages"] },
              then: {
                $add: ["$current_page", 1], // plus 1
              },
              else: "$total_pages",
            },
          },
          prev_page: {
            $cond: {
              if: { $gt: ["$current_page", 1] },
              then: {
                $add: ["$current_page", -1], // minus 1
              },
              else: 1,
            },
          },
        },
      },
    ];
  }

  // Config 'data' field
  _setDataPaginate(select, match, skip, limit, sort, options) {
    let data = [
      {
        $match: match,
      },
      ...options, // $lookup, $unwind...
      { $sort: sort }, 
      { $skip: skip },
      { $limit: limit },
    ];

    // Select define field (get all field if not)
    if (select) {
      data.push({
        $project: select,
      });
    }

    return data;
  }
}
module.exports = BaseRepository;
