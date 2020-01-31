const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    number : {
        type : String,
        unique : true
    },
    serviceName : {
        type : String
    },
    timeCost : {
        type : String
    },
    vehicleType : {
        type : String
    },
    details : {
        type : String
    },
    price : {
        type : Number
    },
    validTime : {
        type : String
    }
})

mongoose.model('Service',ServiceSchema)