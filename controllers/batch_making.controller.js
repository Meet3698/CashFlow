const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const UserVehicle = mongoose.model('UserVehicle')
const Service = mongoose.model('Service')
const Cleaner = mongoose.model('Cleaner')
const Package = mongoose.model('Package')
const Track = mongoose.model('Track')

router.post('/',async(req,res)=>{
    let cust = []
    const email = req.body.email
    const cleaner = await Cleaner.find({ $and : [{email : email},{flag : 0}]})
    const service = await Service.find({flag:0})
    const len = service.length
    const len1 = cleaner.length
    
    if(len >0 && len1>0)
    {
        let time = new Date().getHours() + 6
        console.log(time);
        
        for(i=0;i<len;i++)
        {
            const package = await Package.find({packageId:service[i].id})   
            const vehicle = await UserVehicle.find({number : service[i].number,prefferedTime:time})
            if(Object.keys(vehicle).length == 0)
            {
                continue;
            }
            else
            {
                console.log(cleaner[0].email)
                console.log(vehicle[0].email)
                console.log(cleaner[0].name)
                console.log(cleaner[0].phone)
                
                await Service.collection.updateOne(
                    {number :  service[i].number},
                    {$set : { flag : 1}}
                )
                
                await Cleaner.collection.updateOne(
                    {email:email},
                    {$set : { flag : 1}})
                
                cust.push({cleaner : cleaner, vehicle : vehicle, package : package})
            
                const track = new Track({cleaner_email : cleaner[0].email,user_email : vehicle[0].email,cleaner_name : cleaner[0].name, cleaner_phone : cleaner[0].phone})
                await track.save()
                break
            }
        }
        res.json({list : cust})
    }
    else
    {
        res.json({message:false}) 
    }
    // const arr = await Cleaner.collection.find({flag:0}).toArray()
    // const service = await Service.collection.find({flag : 0}).toArray()
    
    // let len = arr.length-1
    // let len1 = service.length 
    // let cust = []
    
    
    // for (i=0;i<len1;i++)
    // {
    //     if(len >= 0)
    //     {   
    //         // let offset =((new Date().getTimezoneOffset() / 60) * -1)
    //         let time = new Date().getHours() + 6

    //         console.log("Time : ",time)
            
    //         const arr1 = await UserVehicle.collection.find({number : service[i].number,prefferedTime:time}).toArray()
    //         const pack = await Package.collection.find({packageId : service[i].id}).toArray()
    //         console.log(arr1)
            
    //         if (arr1.length)
    //         {
    //             await Service.collection.updateOne(
    //                 {number :  service[i].number},
    //                 {$set : { flag : 1}}
    //             )
                
    //             await Cleaner.collection.updateOne(
    //                 {email:arr[len].email},
    //                 {$set : { flag : 1}})

    //             cust.push({cleaner : arr[len].name, package : pack, customer : arr1[0]})
    //         }
    //         len = len - 1
    //     }
    // }
    
    // res.send(cust)
})
//---------------------------------------------------------------------
router.post('/flag',async(req,res)=>{
    const email = req.body.email
    const email1 = req.body.email1
    const date = new Date().getDate()
    
    await Cleaner.updateOne(
        { email : email },
        {$set : { flag : 0}
    })

    await Service.updateOne(
        {email : email1},
        {$set : {currentdate : date}
    })

    await Track.deleteOne({cleaner_email : email})
    
    res.json({message : true})
})

router.post('/track',async(req,res)=>{
    const email = req.body.email

    const data = await Track.findOne({user_email : email})

    res.json({data : data})
})
//--------------------------------------------------------------------

module.exports = router