const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    email : {
        type : String,
    },
    orderId : {
        type : String
    },
    number : {
        type : Number,
        unique : true
    },
    id : {
        type : Number
    }
})

mongoose.model('Service',ServiceSchema)