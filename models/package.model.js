const mongoose = require('mongoose')

const PackageSchema = new mongoose.Schema({
    packageId : {
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
    vehicleCatagory : {
        type : String
    },
    vehicleType : {
        type : String
    },
    duration : {
        type : Number
    },
    timeCost : {
        type : Number
    }
})

mongoose.model('Package',PackageSchema)