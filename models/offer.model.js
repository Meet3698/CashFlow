const mongoose = require('mongoose')

const OfferSchema = new mongoose.Schema({
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
    code : {
        type : String
    }
})

mongoose.model('Offer',OfferSchema)