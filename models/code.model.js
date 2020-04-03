const mongoose = require('mongoose')

const CodeSchema = new mongoose.Schema({
    email : {
        type : String
    },
    otp : {
        type : Number
    }
})

mongoose.model('Code',CodeSchema)