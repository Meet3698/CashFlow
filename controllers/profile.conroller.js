const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Service = mongoose.model('Service')
const User = mongoose.model('User')

router.post('/userdetails',(req,res)=>{
    console.log(req.body.email);
    User.find({email:req.body.email}).then((data)=>{
        console.log(data[0].phone); 
        res.json({phone : data[0].phone})
    })
})

module.exports = router