const mongoose = require('mongoose')

const PackageSchema = new mongoose.Schema({
    id : {
        type : Number
    },
    name : {
        type : String
    },
    price : {
        type : Number
    },
    details: {
        type : String
    },
    description : {
        type : String
    },
    catagory : {
        type : String
    },
    duration : {
        type : String
    },
    timeCost : {
        type : Number
    }
})

mongoose.model('Package',PackageSchema)