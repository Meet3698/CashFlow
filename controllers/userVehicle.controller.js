const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const UserVehicle = mongoose.model('UserVehicle')
const Brand = mongoose.model('Brand')

router.get('/',(req,res)=>{
    res.sendfile('./view/index.html')
})

router.post('/addvehicle',async (req,res)=>{
    const UserVehicle = new UserVehicle(req.body)
    await UserVehicle.save()

    res.send("ok")
})

router.get('/find',(req,res)=>{
    res.sendfile('./view/index.html')
})

router.post('/findModel',async (req,res)=> {
    const brand = req.body.brand
    const category = req.body.catagory

    Brand.find({brandName:brand,vehicleCatagory:category}).then((err,data)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(data)
      await  }
    })
})

module.exports = router