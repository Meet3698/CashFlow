const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Cleaner = mongoose.model('Cleaner')

router.post('/verifylogin',async(req,res)=>{ 
    const email = req.body.email
    const otp = await OTP.findOne({email:email})
    
    if(otp.otp == req.body.otp)
    { 
        const rand = Math.trunc(Math.random() * 1000000)
        await OTP.update(
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
    const Cleaner = await Cleaner.find({email:email})

    if(Object.keys(Cleaner).length != 0 )
    {
        const rand = Math.trunc(Math.random() * 1000000)
        console.log(rand)

        await OTP.update(
            {email:email},
            {$set : { otp : rand}}
        )

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            Cleaner: 'mycarwash911',
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
