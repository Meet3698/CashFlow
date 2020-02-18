const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    number : {
        type : Number,
        unique : true
    },
    id : {
        type : Number
    },
    vehicleCatagory : {
        type : String
    }
})

mongoose.model('Service',ServiceSchema)