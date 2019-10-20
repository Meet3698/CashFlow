const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    brandName : {
        type : String
    },
    vehicleModel : {
        type : String
    },
    vehicleCatagory : {
        type : String
    }
})

mongoose.model('Brand',brandSchema)