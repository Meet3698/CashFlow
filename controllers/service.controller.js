const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Service = mongoose.model('Service')
const UserVehicle = mongoose.model('UserVehicle')

router.get('/',async(req,res)=>{
    res.sendfile('./view/delete.html')
})

router.post('/find',(req,res)=>{

    const email = req.body.email
    let model = []

    function myfun(model) {
        res.send(model)
      }

    const list = async(email)=>{
        
        await UserVehicle.collection.find({email:email}).toArray().then((result)=>{
            result.map(async(item)=>{
                await Service.collection.find({number:item.number}).toArray().then((data)=>{
                    if(Object.keys(data).length===0)
                    {
                        model.push(item.model)
                    }
                })
                console.log(model);
            })
        })  
        console.log(model)
    }
    
    list(email)
      
    // }).then((err)=>{
    //     console.log(err);
    // }).catch((er)=>{
    //     console.log(er);  
    // })
    // UserVehicle.find({email:email},async(err,data)=>{
    //     const arr = []
    //     for(let i=0;i<data.length;i++)
    //     {
    //         await Service.find({number:data[i].number},async(err,result)=>{
    //             if(Object.keys(result).length===0)
    //             {
    //                 arr.push(data[i].model)
    //                 if(i==data.length-1)
    //                 {
    //                     res.send({list : arr})
    //                 }
    //             }
    //             else
    //             {
    //                 if(i==data.length-1)
    //                 {
    //                     res.send({list : arr})
    //                 }
    //             }
    //         })
        
    //     }         
    // })
})

router.post('/add',async(req,res)=>{
 
    const service = req.body
    Service.collection.insertMany(service,(err,data)=>{
        if(err)
        {
           res.send(err)
        }
        else
        {
            res.send({message:1})
        }
    })
})

router.get('/show',async(req,res)=>{
    try {
        Service.find({}).then((err,data)=>{
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

module.exports = router