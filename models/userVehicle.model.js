const mongoose = require('mongoose')

const UserVehicleSchema = new mongoose.Schema({
    email : {
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
    parkingArea : {
        type : String
    },
    preferredTime : {
        type : String
    }
})

mongoose.model('UserVehicle',UserVehicleSchema)