const mongoose = require('mongoose')

const PackageSchema = new mongoose.Schema({
    price : {
        type : Number
    },
    description : {
        type : String
    }
})

mongoose.model('Package',PackageSchema)