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
    longitude : {
        type : String
    },
    latitude : {
        type : String
    },
    parkingarea : {
        type : String
    },
    prefferedTime : {
        type : Number
    }
})

mongoose.model('UserVehicle',UserVehicleSchema)