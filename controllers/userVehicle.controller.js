const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const UserVehicle = mongoose.model('UserVehicle')
const Brand = mongoose.model('Brand')

router.post('/addvehicle',async (req,res)=>{
    console.log(req.body)

    const userVehicle = new UserVehicle(req.body)
    await userVehicle.save((err)=>{
        if(err)
        {
            if(err.keyPattern.number == 1)
            res.json({message : false})
        }
        else
        {
            res.json({message : true})
        }
    })
})

router.post('/findmodel',async(req,res)=> {
    const brand = req.body.brand
    const catagory = req.body.catagory
    console.log(brand,catagory)
    let list = []
    const result = await Brand.collection.find({brandName:brand,vehicleCatagory:catagory}).toArray()
    const len = result.length

    for(i=0;i<len;i++)
    {
        list.push(result[i].vehicleModel)
    }
    res.json({list:list})
})

router.post('/getvehicle',async(req,res)=>{
    const email = req.body.email
    const vehicle = await UserVehicle.collection.find({email:emai}).toArray()
    const id = await Service.collection.find({email:req.body.email}).toArray()
    const len = id.length
    let pack = []

    for (i = 0; i < len; i++) {
        const res = await Package.collection.find({packageId:id[i].id}).toArray()
        const cust = await UserVehicle.collection.find({number : id[i].number}).toArray()
        pack.push({package : res, customer : cust})
    }
    
    res.send({vehicle:vehicle,package:pack})
})
module.exports = router