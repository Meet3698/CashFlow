const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Brand = mongoose.model('Brand')

router.get('/',(req,res)=>{
    res.sendfile('./view/index.html')
})

router.post('/addvehicle',async (req,res)=>{
    const brand = new Brand(req.body)
    await brand.save()

    res.send("ok")
})

module.exports = router