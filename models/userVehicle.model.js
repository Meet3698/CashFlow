const mongoose = require('mongoose')

const UserVehicleSchema = new mongoose.Schema({
    phone : {
       type : String,
    },
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
    number : {
        type : String,
        unique : true
    },
    fuelType : {
         type : String
    },
    color : {
        type : String
    },
    parkingLotNo : {
        type : Number
    },
    parkingArea : {
        type : String
    },
    preferredTime : {
        type : String
    }
})

mongoose.model('UserVehicle',UserVehicleSchema)