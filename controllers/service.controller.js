const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Service = mongoose.model('Service')
const UserVehicle = mongoose.model('UserVehicle')
const Package = mongoose.model('Package')

router.post('/find',async(req,res)=>{
    const email = req.body.email
    const catagory = req.body.vehicleCatagory
    let model = []
    
    const vehicle = await UserVehicle.collection.find({email:email}).toArray()
    const len = vehicle.length

    for(i=0;i<len;i++)
    {
        const data = await Service.collection.find({number:vehicle[i].number}).toArray()
        console.log(data);
        if(Object.keys(data).length==0)
        {                
            if(catagory == vehicle[i].vehicleCatagory)
            {
                model.push({vehicleModel:vehicle[i].vehicleModel,number:vehicle[i].number})
            }
        }
    }
    res.send(model)
})

router.post('/add',async(req,res)=>{
    const service = req.body
    Service.collection.insertMany(service,(err,data)=>{
        if(err)
        {
           res.send(err)
        }
        else
        {
            res.json({message:1})
        }
    })
})

router.get('/offer',(req,res)=>{
    const offer = Package.find({flag:1})
    console.log(offer);
    res.json({offer : offer})
})

router.get('/refresh',(req,res)=>{      
    setInterval(async() => {
        await Service.updateMany({},{flag : 0})
        console.log('update');
    }, 60000);
})

module.exports = router