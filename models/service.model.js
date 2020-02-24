const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    number : {
        type : Number,
        unique : true
    },
    id : {
        type : Number
    }
})

mongoose.model('Service',ServiceSchema)