const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const UserVehicle = mongoose.model('UserVehicle')
const Cleaner = mongoose.model('Cleaner')

router.get('/',async(req,res)=>{
    let cust = []
    const arr = await UserVehicle.collection.find({}).toArray()
    
    arr1 = await Cleaner.collection.find({}).toArray()
    const flag = arr1.map((item)=>{
        if (item.flag==0)
        {
            cust.push(arr)
        }
    })

})

router.get('/add',(req,res)=>{

    const cleaner = Cleaner({
        email : 'cleaner1@carwash.com',
        name : 'cleaner1',
        phone : 9638409066,
        address : 'abc',
        flag : 0
    })    
    cleaner.save()

})
module.exports = router