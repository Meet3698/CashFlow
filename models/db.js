const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://meet:Meet@3698@anonymous-edqd9.mongodb.net/CarWash?retryWrites=true&w=majority',{useNewUrlParser:true},(err)=>{
    if(!err) console.log('connected!');
    else console.log(err);
})

require('./user.model')
require('./otp.model')
require('./userVehicle.model')
require('./package.model')
require('./brand.model')
require('./color.model')
require('./time.model')
require('./image.model')