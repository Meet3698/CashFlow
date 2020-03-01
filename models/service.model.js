const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    email : {
        type : String,
    },
    orderId : {
        type : String
    },
    number : {
        type : String,
        unique : true
    },
    id : {
        type : Number
    },
    flag : {
        type : Number
    }
})

mongoose.model('Service',ServiceSchema)