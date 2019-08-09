const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName : {
        type : String
    },
    email : {
        type : String
    },
   phone : {
       type : String,
       unique : true
   }
})

UserSchema.statics.findUserById = async (phone) => {
    
    const del = await User.deleteOne({phone:phone})

    return del
}


const User = mongoose.model('User',UserSchema)