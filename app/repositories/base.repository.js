const {
  PAGINATE_LIMIT_DEFAULT,
  PAGINATE_FIRST_PAGE,
  SORT_ASC,
} = require("@lib/constants");

const mongoose = require("mongoose");
const { isEmptyObj } = require("@common");

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

  /**
   * - Paginate improve data speed (base non-unique sort and paginate)
   * - Find out: https://tutv.dev/fast-pagination-mongodb-69cb8de56d14
   *
   * - Attention:
   * + 'sort' only can by 2 fields 1st is non-unique field and 2nd is '_id'
   *   Ex: { 'names.en': -1, _id: 1 } | { 'names.en': -1, _id: 1 } | { price: -1, _id: -1 }...
   *
   * @param {*} paginateOption
   * @returns
   */
  async paginate({
    select = null,
    match = {},
    limit = PAGINATE_LIMIT_DEFAULT,
    page = PAGINATE_FIRST_PAGE,
    sort = {
      _id: SORT_ASC,
    },
    options = [],
  }) {
    // Set meta_data
    limit = parseInt(limit);

    // Find meta data
    let metaData = this._setMetaDataPaginate(match, page, limit);

    // page = 1
    let firstPageLimit = this._isFirstPage(page) ? limit : (page - 1) * limit;
    const firstPage = await this.model
      .find(match)
      .limit(firstPageLimit)
      .sort(sort);

    // page = n
    let lastDoc = firstPage[firstPage.length - 1];

    // Set condition
    match = this._setMatch(sort, lastDoc, match, page);

    // Query get data
    let data = this._setDataPaginate(select, match, limit, sort, options);

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

  // [Paginate] Config 'meta_data' field
  _setMetaDataPaginate(match, page, limit) {
    return [
      {
        $match: match, // Filter valid data
      },
      { $count: "total" }, // Count total record
      {
        // add field to calculator paginate inform
        $addFields: {
          per_page: limit,
          current_page: parseInt(page),
          total_pages: {
            // Calc total pages
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
            // Calc next page
            $cond: {
              if: { $lt: ["$current_page", "$total_pages"] },
              then: {
                $add: ["$current_page", 1], // plus 1
              },
              else: "$total_pages",
            },
          },
          prev_page: {
            // Calc prev page
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

  // [Paginate] Config 'data' field
  _setDataPaginate(select, match, limit, sort, options) {
    let data = [
      {
        $match: match,
      },
      ...options, // $lookup, $unwind...
      { $sort: sort },
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

  // [Paginate] Check if was first page
  _isFirstPage(page) {
    return page == PAGINATE_FIRST_PAGE;
  }

  // [Paginate] Set filter condition
  _setMatch(sort, lastDoc, match, page) {
    let filterSort = [];
    let skipLastDoc = {};

    // Set sort condition
    Object.keys(sort).map((key) => {
      // Determine this key sort by 'ASC' or 'DESC'
      let sortType = sort[key] == SORT_ASC ? "$gt" : "$lt";
      let lastDocKeyValue;

      // Skip _id from condition skip last docs
      if (key != "_id") {
        // Sort by key in object
        if (key.includes(".")) {
          let keySplit = key.split(".");
          let subDocKey = keySplit[0];
          let subDocValue = keySplit[1];

          lastDocKeyValue = lastDoc[subDocKey][subDocValue];
        } else {
          lastDocKeyValue = lastDoc[key];
        }
        skipLastDoc[key] = lastDocKeyValue;

        // Set '$gt' or '$lt' for this key
        let keySort = {
          [key]: {
            [sortType]: lastDocKeyValue,
          },
        };

        filterSort.push(keySort);
      } else {
        skipLastDoc["_id"] = {
          [sortType]: lastDoc["_id"],
        };
      }
    });

    // Add condition skip last doc from previous page
    filterSort.push(skipLastDoc);

    // Return filters condition
    let newMatch = {
      $and: [
        this._isFirstPage(page)
          ? {}
          : {
              // Sort condition
              $or: filterSort,
            },
      ],
    };

    if (!isEmptyObj(match)) {
      newMatch["$and"].push(match);
    }

    return newMatch;
  }
}
module.exports = BaseRepository;
