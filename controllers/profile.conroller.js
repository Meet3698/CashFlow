const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Service = mongoose.model('Service')
const User = mongoose.model('User')
const Package = mongoose.model('Package')
const UserVehicle = mongoose.model('UserVehicle')
const Code = mongoose.model('Code')

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
        const code = await Code.collection.find({id : id[i].id}).toArray()
        pack.push({package : res, customer : cust, code : code})
    }
    console.log(pack.code);
    res.send(pack)
})

router.post('/getcode',async(req,res)=>{
    const email = req.body.email
    const service = await Service.find({$and : [{email:email,flag:1}]})
    code = []

    for (i=0;i<service.length;i++)
    {
        const code = await Code.find({id : service[i].id})
        const package = await package.find({packageId : service[i].id})
    }
    console.log(code,service);
    res.json({service : service,package : package, code : code})  
})

module.exports = router