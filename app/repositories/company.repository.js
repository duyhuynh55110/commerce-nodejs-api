const mongoose = require("mongoose");

// models
const Company = mongoose.model("Company");

// base repo for all repo
const BaseRepository = require("./base.repository");

// Data not found error
const DataNotFoundHttpError = require('@errors/dataNotFoundHttp.error');

class CompanyRepository extends BaseRepository {
  constructor() {
    super();
    this.setModel(Company);
  }

  // Find company by id
  getCompanyById(
    id,
    select = {
      inform: "$inform",
    }
  ) {
    try {
      id = mongoose.Types.ObjectId(id);
    } catch (e) {
      throw new DataNotFoundHttpError();
    }

    return this.model.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "company_id",
          as: "products",
        },
      },
      {
        $project: select,
      },
    ]);
  }
}

module.exports = new CompanyRepository();
