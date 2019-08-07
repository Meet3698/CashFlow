const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    carname : {
        type : String,
    },
    nplate : {
        type : String
    },
    tpye : {
        type : String
    },
    address : {
        type : String
    },
    parking_spot : {
        type : String
    },
    time_slot : {
        type : String
    }
})

mongoose.model('Car',carSchema)