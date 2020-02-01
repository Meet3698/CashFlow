const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Service = mongoose.model('Service')

router.get('/',(req,res)=>{
    res.sendfile('./view/index.html')
})

router.post('/add',(req,res)=>{
    const item = []
    const len = item.length
    let cnt = 0
    item.push(req.body)
    console.log(item);
    
    item.forEach(element => {
        const service = new Service(element)
        service.save((err)=>{
            if(err)
            {
                res.send({message:0})
            }
            else if(cnt<len)
            {
                cnt = cnt + 1
            }
            else
            {
                res.send({message:1})
            }
        })
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