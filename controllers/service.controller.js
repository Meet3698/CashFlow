const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Service = mongoose.model('Service')
const UserVehicle = mongoose.model('UserVehicle')

router.get('/',async(req,res)=>{
    res.sendfile('./view/delete.html')
})

router.post('/find',async(req,res)=>{
    const email = req.body.email
    const catagory = req.body.vehicleCatagory
    let model = []
    
    const vehicle = await UserVehicle.collection.find({email:email}).toArray()
    
    model = vehicle.map(async item => {
        const data = await Service.collection.find({number:item.number}).toArray()    
          
            if(Object.keys(data).length==0)
            {                
                if(catagory == item.vehicleCatagory)
                {
                    return {vehicleModel:item.vehicleModel,number:item.number}
                }
            }
    })

    const result = await Promise.all(model)
    const resp = result.filter((item)=>{return item})
    res.send(resp)
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
            res.send({message:1})
        }
    })
})

router.get('/show',async(req,res)=>{
    try {
        Service.find({}).then((err,data)=>{
            if(err){
                res.json(err)
           }
            else{
               res.json(data)
                await  
            }
       })
        } catch (e) {
            const err = new Error(e)
            log(err.message)
    }
})

module.exports = router