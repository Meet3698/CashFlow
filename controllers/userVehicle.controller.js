const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const UserVehicle = mongoose.model('UserVehicle')
const Brand = mongoose.model('Brand')

router.get('/',(req,res)=>{
    res.sendfile('./view/index.html')
})

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

router.get('/find',(req,res)=>{
    res.sendfile('./view/index.html')
})

router.post('/findModel',(req,res)=> {
    const brand = req.body.brand
    const category = req.body.catagory
    
    Brand.collection.find({brandName:brand,vehicleCatagory:category}).toArray().then((result)=>{
        const list = result.map(getModelName)
        res.json({list:list})
    })

    function getModelName(item) {
        let model = [item.vehicleModel].join(",")
        return model;
      }
})

module.exports = router