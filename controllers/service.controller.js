const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Service = mongoose.model('Service')


router.post('/add',(req,res)=>{
    const service = req.body
    service.forEach(item=>{
        console.log(item);
        const serv = new Service(item)
        serv.save((err)=>{
            console.log(err);
            if(err)
            {
                if(err.keyPattern.number == 1)
                {
                    return res.send({message : 0})
                }  
            }
        })
        })
        res.send({message : 1})
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