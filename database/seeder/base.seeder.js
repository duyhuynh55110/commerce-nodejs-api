class BaseSeeder {
    // Define what model for this seeder
    setModel(model) {
        this.model = model
    }

    // Define name for this seeder
    setName(name) {
        this.name = name
    }

    // Import into collection
    importData = async (data) => {
        try {
            console.log(`Insert ${this.name} data...`)
            await this.model.create(data)
            console.log(`Inserted ${this.name}.`)
        } catch (error) {
            console.log(error)
        }
    }

    // Delete data
    deleteData = async () => {
        try {
            console.log(`Data ${this.name} truncating...`)
            await this.model.deleteMany()
            console.log(`Truncated ${this.name}.`)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = BaseSeeder