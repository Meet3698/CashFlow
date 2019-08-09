const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    carName : {
        type : String,
    },
    numberPlate : {
        type : String
    },
    carTpye : {
        type : String
    },
    address : {
        type : String
    },
    parkingSpot : {
        type : String
    },
    timeSlot : {
        type : String
    }
})

mongoose.model('Car',carSchema)