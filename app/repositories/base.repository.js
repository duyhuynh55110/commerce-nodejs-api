const { PAGINATE_LIMIT_DEFAULT } = require('@lib/constants');

const mongoose = require('mongoose');

class BaseRepository {
    // Define what model for this repo
    setModel(model) {
        this.model = model;
    }

    // get all
    all () {
        return this.model.find({})
    }

    // get doc by _id
    getDocById (id, select = null) {
        let query = [
            {
                $match: { '_id': mongoose.Types.ObjectId(id) }
            },
        ];

        // Select define field (get all field if not)
        if(select) {
            query.push({
                $project: select
            })
        }

        return this.model.aggregate(query)
    }

    // get docs and paginate
    paginate (select = null, limit = PAGINATE_LIMIT_DEFAULT, page = 1) {
        limit = parseInt(limit);
        page = parseInt(page);
        let skip = limit * page;

        let data = this._setDataPaginate(skip, limit, select)
        let metaData = this._setMetaDataPaginate(limit, page)

        return this.model.aggregate(
            [
                {
                    '$facet': {
                        'data': data,
                        'meta_data': metaData
                    }
                },
                {
                    $project: {
                        data: 1,
                        meta_data: {
                            $arrayElemAt: ["$meta_data", 0]
                        },
                    }
                }
            ]
        )
    }

    // Config 'meta_data' field
    _setMetaDataPaginate (limit, page) {
        return [
            { $count: 'total' },
            {
                $addFields: // add field to calculator paginate inform
                {
                    per_page: limit,
                    current_page: page,
                    total_pages: {
                        $ceil: {
                            $divide: ['$total', limit],
                        }
                    }
                }
            },
            {
                $project: { // Manage return fields
                    total: 1,
                    total_pages: 1,
                    current_page: 1,
                    per_page: 1,
                    next_page: {
                        $cond: {
                            if: { $lt: ['$current_page', '$total_pages'] },
                            then: {
                                $add: ['$current_page', 1] // plus 1
                            },
                            else: '$total_pages'
                        }
                    },
                    prev_page: {
                        $cond: {
                            if: { $gt: ['$current_page', 1] },
                            then: {
                                $add: ['$current_page', -1] // minus 1
                            },
                            else: 1
                        }
                    }
                }
            }
        ]
    }

    // Config 'data' field
    _setDataPaginate (skip, limit, select = null) {
        let data = [
            { $skip: skip },
            { $limit: limit },
        ]

        // Select define field (get all field if not)
        if(select) {
            data.push({
                $project: select
            })
        }

        return data
    }
}

module.exports = BaseRepository