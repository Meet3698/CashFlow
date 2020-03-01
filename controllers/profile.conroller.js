const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Service = mongoose.model('Service')
const User = mongoose.model('User')
const Package = mongoose.model('Package')
const UserVehicle = mongoose.model('UserVehicle')

router.post('/userdetails',(req,res)=>{
    User.find({email:req.body.email}).then((data)=>{
        res.json({name:data[0].userName,phone : data[0].phone})
    })
})

router.post("/history",async(req,res)=>{
    console.log(req.body);
    
    const id = await Service.collection.find({email:req.body.email}).toArray()
    const len = id.length
    let pack = []

    for (i = 0; i < len; i++) {
        const res = await Package.collection.find({packageId:id[i].id}).toArray()
        const cust = await UserVehicle.collection.find({number : id[i].number}).toArray()
        pack.push({package : res, customer : cust})
    }
    
    res.send(pack)
})

module.exports = router