const express = require('express')
const router = express.Router()
const VehicleController = require('./vehicle.controller')

router.use('/Vehicle',VehicleController)

router.get('/',(req,res)=>{
    res.sendfile('./view/index.html')
})

module.exports = router