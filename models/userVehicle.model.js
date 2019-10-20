const mongoose = require('mongoose')

const UserVehicle = new mongoose.Schema({
    phone : {
       type : String,
       unique : true
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

mongoose.model('UserVehicle',UserVehicle)