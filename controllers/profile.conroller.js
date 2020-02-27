const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Service = mongoose.model('Service')
const User = mongoose.model('User')

router.post('/userdetails',(req,res)=>{
    console.log(req.body.email);
    User.find({email:req.body.email}).then((data)=>{
        console.log(data);
        
        res.json({email : data.email,phone : data.phone})
    })
})

module.exports = router