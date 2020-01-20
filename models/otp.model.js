const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    email : {
        type : String
    },
    otp : {
        type : Number
    }
})

mongoose.model('OTP',otpSchema)