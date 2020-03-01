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

UserSchema.statics.findUserById = async (email) => {
    const del = await User.deleteOne({email:email})
    return del
}
mongoose.model('UserTemp',UserTempSchema)