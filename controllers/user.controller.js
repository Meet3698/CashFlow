const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const User = mongoose.model('User')

router.get('/',(req,res)=>{
    res.sendfile('./view/index.html')
})

router.post('/add',async (req,res)=>{
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send({success:true})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/auth',async (req,res)=>{
        try {
            const user = await User.findByCredentials(req.body.email,req.body.password)
            res.send('<h1>'+user+'</h1>')
        } catch (e) {
            res.status(400).send(e)
        }
})

router.get('/login',async (req,res)=>{
    
    res.sendfile('./view/index.html')
})

module.exports = router