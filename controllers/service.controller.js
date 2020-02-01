const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Service = mongoose.model('Service')
const UserVehicle = mongoose.model('UserVehicle')

router.get('/',(req,res)=>{
    res.sendfile('./view/delete.html')
})

router.post('/find',(req,res)=>{
    const email = req.body.email

    UserVehicle.find({email:email},async(err,data)=>{
        const arr = []
        for(i=0;i<data.length;i++)
        {
            await Service.find({number:data[i].number},(err,result)=>{
                if(Object.keys(result).length===0)
                {
                    console.log(data[i]);
                    arr.push(data[i].model)
                }
            })
        }
        res.send({list : arr})         
    })
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