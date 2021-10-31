const mongoose = require("mongoose");

// models
const Company = mongoose.model("Company");

// base repo for all repo
const BaseRepository = require("./base.repository");

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
    return this.model.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
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
