const mongoose = require('mongoose')

const VehicleSchema = new mongoose.Schema({
    type : {
        type : String,
    },
    brand : {
        type : String
    },
    model : {
        type : String
    },
    catagory : {
        type : String
    },
    fuelType : {
        type : String
    },
    color : {
        type : String
    }
})

mongoose.model('Vehicle',VehicleSchema)