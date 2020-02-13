const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Package = mongoose.model('Package')

router.get('/',(req,res)=>{
    res.sendfile('./view/index.html')
})


router.get('/show',async(req,res)=>{
    try {
        Package.find({}).then((err,data)=>{
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

router.post('/addpack',async (req,res)=>{
    const package = new Package(req.body)
    await package.save()

    res.send("ok")
})

module.exports = router