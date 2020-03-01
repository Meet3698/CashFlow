const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const UserVehicle = mongoose.model('UserVehicle')
const Brand = mongoose.model('Brand')

router.post('/addvehicle',async (req,res)=>{
    console.log(req.body);
    
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

router.post('/findModel',async(req,res)=> {
    const brand = req.body.brand
    const catagory = req.body.catagory
    console.log(brand,catagory);
    let list = []
    const result = await Brand.collection.find({brandName:brand,vehicleCatagory:catagory}).toArray()
    const len = result.length

    for(i=0;i<len;i++)
    {
        list.push(result[i].vehicleModel)
    }
    res.json({list:list})
})

module.exports = router