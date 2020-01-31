const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Service = mongoose.model('Service')


router.post('/add',(req,res)=>{
    const service = req.body
    service.forEach(item=>{
        console.log(item);
        const serv = new Service(item)
        serv.save(async(err)=>{
            if(err)
            {
                if(err.keyPattern.number == 1)
                {
                    res.json({message : 0})
                }  
            }
        })
        })
        res.json({message : 1})
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