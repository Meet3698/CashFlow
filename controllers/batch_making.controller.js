const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const UserVehicle = mongoose.model('UserVehicle')
const Service = mongoose.model('Service')
const Cleaner = mongoose.model('Cleaner')
const Package = mongoose.model('Package')

router.post('/',async(req,res)=>{
    
    const arr = await Cleaner.collection.find({flag:0}).toArray()
    const service = await Service.collection.find({flag : 0}).toArray()
    
    let len = arr.length-1
    let len1 = service.length 
    let cust = []
   
    for (i=0;i<len1;i++)
    {
        if(len >= 0)
        {   
            // let offset =((new Date().getTimezoneOffset() / 60) * -1)
            let time = new Date().getHours() + 6

            console.log("Time : ",time)
            
            const arr1 = await UserVehicle.collection.find({number : service[i].number,prefferedTime:time}).toArray()
            const pack = await Package.collection.find({packageId : service[i].id}).toArray()
            console.log(arr1)
            
            if (arr1.length)
            {
                await Service.collection.updateOne(
                    {number :  service[i].number},
                    {$set : { flag : 1}}
                )
                
                await Cleaner.collection.updateOne(
                    {email:arr[len].email},
                    {$set : { flag : 1}})

                cust.push({cleaner : arr[len].name, package : pack, customer : arr1[0]})
            }
            len = len - 1
        }
    }
    console.log(cust);
    
    res.send(cust)
})
//---------------------------------------------------------------------
router.post('/flag',async(req,res)=>{
    const email = req.body.email

    await Cleaner.update(
        { email : email },
        {$set : { flag : 0}
    })

    // await Service.update(
    //     {email : email},
    //     {$set : { flag : 0}
    // })
    res.send("done")
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
//--------------------------------------------------------------------

module.exports = router