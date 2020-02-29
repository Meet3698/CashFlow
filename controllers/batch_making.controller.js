const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const UserVehicle = mongoose.model('UserVehicle')
const Service = mongoose.model('Service')
const Cleaner = mongoose.model('Cleaner')

router.get('/',async(req,res)=>{
    let cust = []

    const arr = await UserVehicle.collection.find({flag:0}).toArray()
    const arr1 = await Cleaner.collection.find({}).toArray()

    const flag = arr1.map((item)=>{   
            let len = arr.length-1 
            // let customer = arr[len]
            if (item.flag==0 && len>=0)
            {       
                cust.push({cleaner : item.name, customer : arr[len]})
                
                UserVehicle.updateOne(
                    {number : arr[len].number},
                    {$set : { flag : 1}}
                ).then(()=>{})
        
                Cleaner.updateOne(
                    {email:item.email},
                    {$set : { flag : 1}}
                ).then(()=>{})
        
                arr.pop()
            }
        })

    const result = await Promise.all(cust)
    console.log("result ",result);
    const resp = result.filter((item)=>{return item})
    res.send(resp)
})

// const flag = arr1.map((item)=>{   
//     let len = arr.length-1 
    
//     if (item.flag==0 && len>=0)
//     {            
//         cust.push({cleaner : item.name, customer : arr[len]})
        
//         UserVehicle.updateOne(
//             {number : customer.number},
//             {$set : { flag : 1}}
//         ).then(()=>{})

//         Cleaner.updateOne(
//             {email:item.email},
//             {$set : { flag : 1}}
//         ).then(()=>{})

//         arr.pop()
//     }
// })
//---------------------------------------------------------------------
router.get('/flag',async(req,res)=>{
    await Cleaner.updateMany(
        {$set : { flag : 0}}
    )
    await UserVehicle.updateMany(
        {$set : { flag : 0}}
    )
    res.send("Done")
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