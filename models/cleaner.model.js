const mongoose = require('mongoose')

const cleanerSchema = new mongoose.Schema({
   email : {
       type : String,
       unique : true
   },
   name : {
       type : String
   },
   phone : {
       type : Number,
       unique : true
   },
   address : {
        type : String
   },
   flag : {
       type : Number
   }
})

mongoose.model('Cleaner',cleanerSchema)