const mongoose = require('mongoose')

const CodeSchema = new mongoose.Schema({
    id : {
        type : Number
    },
    code : {
        type : String
    },
    email : {
        type : String
    }
})

mongoose.model('Code',CodeSchema)