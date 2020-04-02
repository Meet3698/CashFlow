const mongoose = require('mongoose')

const OfferSchema = new mongoose.Schema({
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
    },
    code : {
        type : String
    }
})

mongoose.model('Offer',OfferSchema)