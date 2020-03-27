const mongoose = require('mongoose')

const TrackSchema = new mongoose.Schema({
   cleaner_email : {
       type : String,
       unique : true
   },
   user_email : {
       type : String
   },
   cleaner_phone : {
       type : Number,
       unique : true
   },
   cleaner_name : {
        type : String
   }
})

mongoose.model('Track',TrackSchema)