const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    serviceName : {
        type : String
    },
    number : {
        type : String,
        unique : true
    },
    briefdetail : {
        type : String
    },
    details : {
        type : String
    },
    timeCost : {
        type : String
    },
    price : {
        type : Number
    },
    duration : {
        type : String
    },
    vehicleType : {
        type : String
    }
})

mongoose.model('Service',ServiceSchema)