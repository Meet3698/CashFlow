const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Service = mongoose.model('Service')

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