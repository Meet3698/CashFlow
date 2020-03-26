const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
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
   },
   lng : {
       type : String
   },
   lat : {
       type : String
   }
})

mongoose.model('User',UserSchema)