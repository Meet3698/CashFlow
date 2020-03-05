const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const UserVehicle = mongoose.model('UserVehicle')
const Brand = mongoose.model('Brand')
const Service = mongoose.model('Service')
const Package = mongoose.model('Package')

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
    const vehicle = await UserVehicle.collection.find({email:req.body.email}).toArray()
    const len = vehicle.length
    let pack = []

    for (i = 0; i < len; i++) {
        const service = await Service.collection.findOne({number : vehicle[i].number})
        const package = await Package.collection.findOne({packageId:service.id})
        pack.push({customer : vehicle[i],package : package})
    }
    
    res.send(pack)
})
module.exports = router