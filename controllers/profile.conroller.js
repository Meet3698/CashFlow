const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Service = mongoose.model('Service')
const User = mongoose.model('User')

router.post('/userdetails',async(res,req)=>{
    console.log(req.body);
    
    User.find({email:req.body.email}).then((data)=>{
        res.json({email : data.email,phone : data.phone})
    })
})

module.exports = router