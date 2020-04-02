const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Package = mongoose.model('Package')

router.get('/',(req,res)=>{
    res.sendfile('./view/index.html')
})


router.get('/show',async(req,res)=>{
    const package = await Package.find({flag:0})
    res.json(package)
})

router.get('/offer',async(req,res)=>{
    const offer = await Package.find({flag:1})
    console.log(offer);
    res.json({offer : offer})
})

router.post('/addpack',async (req,res)=>{
    const package = new Package(req.body)
    await package.save()
    res.send("ok")
})

module.exports = router