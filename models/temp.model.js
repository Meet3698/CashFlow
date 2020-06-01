const mongoose = require('mongoose')

const tempSchema = new mongoose.Schema({
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
        type : String
    }
})

mongoose.model('Temp',tempSchema)