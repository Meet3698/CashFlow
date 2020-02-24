const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const UserVehicle = mongoose.model('UserVehicle')
const Cleaner = mongoose.model('Cleaner')

router.get('/',async(req,res)=>{
    let cust = []

    const arr = await UserVehicle.collection.find({}).toArray()
    const len = arr.length-1
    console.log("Length",len);
    
    const arr1 = await Cleaner.collection.find({}).toArray()

    const flag = arr1.map(async(item)=>{
        if (item.flag==0)
        {
            cust.push(arr[len])
            // console.log(arr[len]);
            await UserVehicle.update(
                {email:arr[len].email},
                {$set : { flag : 1}}
            )

            // console.log(cust);
            
            arr.pop()
            
            // console.log(arr);
            await Cleaner.update(
                {email:item.email},
                {$set : { flag : 1}}
            )
        }
    })

    const result = await Promise.all(cust)
    const resp = result.filter((item)=>{return item})
    res.send(resp)
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
router.get('/flag',async(req,res)=>{
    await Cleaner.updateMany(
        {$set : { flag : 1}}
    )
    res.send("Done")
})
module.exports = router