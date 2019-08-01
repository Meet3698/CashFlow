const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true,
    }
})

UserSchema.pre('save',async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})

UserSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email}) 
    
    if(user === null){
        return 'user doesn\'t exist'
    }

    const isMatch = await bcrypt.compare(password,user.password)
    
    if(isMatch === false){
        return 'wrong password'
    }

    return user

}   

const User = mongoose.model('User',UserSchema)