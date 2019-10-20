const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema({
    name : {
        type : String
    }
})

mongoose.model('Color',colorSchema)