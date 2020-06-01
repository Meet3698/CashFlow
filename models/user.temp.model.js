const mongoose = require('mongoose')

const UserTempSchema = new mongoose.Schema({
    userName : {
        type : String
    },
    email : {
        type : String,
        unique : true
    },
    phone : {
       type : String,
       unique : true
   },
    address : {
       type : String
   }
})

mongoose.model('UserTemp',UserTempSchema)