const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const UserVehicle = mongoose.model('UserVehicle')
const Brand = mongoose.model('Brand')

router.get('/',(req,res)=>{
    res.sendfile('./view/index.html')
})

router.post('/addvehicle',async (req,res)=>{
    const Uservehicle = new UserVehicle(req.body)
    await Uservehicle.save().then((data)=>{
        res.json({message : true})
    })
})

router.get('/find',(req,res)=>{
    res.sendfile('./view/index.html')
})

router.post('/findModel',(req,res)=> {
    const brand = req.body.brand
    const category = req.body.catagory
    
    const model = Brand.find({brandName:brand,vehicleCatagory:category},(err,data)=>{
        // console.log(data);
        const arr = []

        for(i=0;i<data.length;i++)
        {
            arr.push(data[i].vehicleModel) 
        }
        res.send({list : arr})   
    })
})

module.exports = router