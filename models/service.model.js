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
    },
    currentdate : {
        type : String
    },
    expiredate : {
        type : String
    }
})

mongoose.model('Service',ServiceSchema)