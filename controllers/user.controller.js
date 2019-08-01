const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const User = mongoose.model('User')

router.get('/',(req,res)=>{
    res.sendfile('./view/index.html')
})

router.post('/add',async (req,res)=>{
    const user = new User(req.body)
    console.log(user);
    
    try{
        await user.save()
        res.status(201).json({message:"true"})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/auth',async (req,res)=>{
        try {
            console.log(req.body.email);
            console.log(req.body.password);
            
            const user = await User.findByCredentials(req.body.email,req.body.password)
            res.status(201).json({message : JSON.stringify(user)})
        } catch (e) {
            const err = new Error(e)
            console.log(err.message);
            
            res.send(err.message)
        }
})

router.get('/login',(req,res)=>{
    res.sendfile('./view/index.html')
})

module.exports = router