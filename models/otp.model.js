const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    phone : {
        type : String
    },
    otp : {
        type : Number
    }
})

mongoose.model('OTP',otpSchema)