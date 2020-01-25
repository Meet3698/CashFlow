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
   }
})

UserSchema.statics.findUserById = async (phone) => {
    const del = await User.deleteOne({phone:phone})
    return del
}


const User = mongoose.model('User',UserSchema)