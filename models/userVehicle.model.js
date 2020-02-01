const mongoose = require('mongoose')

const UserVehicleSchema = new mongoose.Schema({
    email : {
       type : String,
       unique: true
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
    longitude : {
        type : String
    },
    latitude : {
        type : String
    },
    parkingarea : {
        type : String
    },
    preferredTime : {
        type : String
    }
})

mongoose.model('UserVehicle',UserVehicleSchema)