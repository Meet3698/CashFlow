const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Service = mongoose.model('Service')

router.get('/',(req,res)=>{
    res.sendfile('./view/index.html')
})

router.post('/add',async(req,res)=>{
    const service = new Service(req.body)
    await service.save((err)=>{
        if(err)
        {
            res.json({message:0})
        }
        else
        {
            res.json({message:1})
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