const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    number : {
        type : Number
    },
    id : {
        type : Number
    }
})

mongoose.model('Service',ServiceSchema)