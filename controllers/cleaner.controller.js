const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Cleaner = mongoose.model('Cleaner')
const OTP = mongoose.model('OTP')
const nodemailer = require('nodemailer')

router.post('/verifylogin',async(req,res)=>{ 
    const email = req.body.email
    const otp = await OTP.findOne({email:email})
    console.log(otp);
    console.log(req.body.otp);
    
    if(otp.otp == req.body.otp)
    { 
        const rand = Math.trunc(Math.random() * 1000000)
        await OTP.updateOne(
            {email:email},
            {$set : {otp : rand}}
          )
        res.json({message : true})
    }
    else
    {
        res.json({message : false})
    }
})
  
router.post('/loginotp',async (req,res) =>{

    const email = req.body.email
    console.log(email)
    const cleaner = await Cleaner.find({email:email})

    if(Object.keys(cleaner).length != 0 )
    {
        const rand = Math.trunc(Math.random() * 1000000)
        console.log(rand)

        await OTP.updateOne(
            {email:email},
            {$set : { otp : rand}}
        )

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'mycarwash911',
            pass: 'fepkxlltzzdqbxbm'
            }
        });
    
        var mailOptions = {
            from: 'mycarwash911@gmail.com',
            to: req.body.email,
            subject: 'Your OTP',
            text: rand.toString()
        }
    
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        })

        res.json({message : true})
    }
    else
    {
        res.json({message : false})
    }
})

router.post('/add',async(req,res)=>{
    const email = 'cleaner1@carwash.com'
    const cleaner = Cleaner({
        email : email,
        name : 'cleaner1',
        phone : 9638409066,
        address : 'abc',
        flag : 0
    })    

    const rand = Math.trunc(Math.random() * 1000000)
    const otp = new OTP({
    email : email,
    otp : rand
    })
          
    await otp.save()
    await cleaner.save()

    res.send("ok")
})

module.exports = router