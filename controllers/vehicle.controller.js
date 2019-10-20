const express = require('express')
const router = express.Router()
const UserVehicleController = require('./uservehicle.controller')

const mongoose = require('mongoose')
const Vehicle = mongoose.model('Vehicle')

router.use('/Uservehicle',UserVehicleController)

router.get('/',(req,res)=>{
    res.sendfile('./view/index.html')
})

router.post('/addvehicle',async (req,res)=>{
    const vehicle = new Vehicle(req.body)
    await vehicle.save()
})

module.exports = router