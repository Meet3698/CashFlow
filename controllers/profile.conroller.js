const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Service = mongoose.model('Service')
const User = mongoose.model('User')
const Package = mongoose.model('Package')

router.post('/userdetails',(req,res)=>{
    User.find({email:req.body.email}).then((data)=>{
        res.json({phone : data[0].phone})
    })
})

router.post("/history",async(req,res)=>{
    console.log(req.body);
    
    const id = await Service.collection.find({email:req.body.email}).toArray()
    const pack = id.map(async(item)=>{
        return await Package.collection.find({packageId:item.id}).toArray()
    })
    const result = await Promise.all(pack)
    console.log(result);
    
    res.send(result)
})
module.exports = router