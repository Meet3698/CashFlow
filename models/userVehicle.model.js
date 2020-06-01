const mongoose = require('mongoose')

const UserVehicleSchema = new mongoose.Schema({
    email : {
       type : String,
    },
    vehicleType : {
        type : String,
    },
    brandName : {
        type : String
    },
    vehicleModel : {
        type : String
    },
    vehicleCatagory : {
        type : String
    },
    number : {
        type : String,
        unique : true
    },
    address : {
        type : String
    },
    lat : {
        type : String
    },
    lng : {
        type : String
    },
    phone : {
        type : Number
    },
    parkingarea : {
        type : String
    },
    prefferedTime : {
        type : Number
    }
})

mongoose.model('UserVehicle',UserVehicleSchema)