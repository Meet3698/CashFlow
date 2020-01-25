const express = require('express')
const router = express.Router()

// const Nexmo = require('nexmo')
// const nexmo = new Nexmo({
//     apiKey: 'b57f3d3e',
//   apiSecret: 'PnSzEghASz0JmJP5',
// },{debug:true})

const sgKey="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"
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(sgKey);

const mongoose = require('mongoose')
const User = mongoose.model('User') 
const OTP = mongoose.model('OTP')

var sess=''

router.get('/',(req,res )=>{
    res.sendfile('./view/verify.html')
})

router.post('/registerotp',async(req,res)=>{
    sess = req.session
    sess.email = req.body.email

    const user = new User(req.body)

    await user.save(async(err)=>{
        if(err)
        {
            if(err.keyPattern.email == 1)
            {
                res.json({message : 0})
            }  
            if(err.keyPattern.phone == 1)
            {
                res.json({message : 1})
            }
        }
        else{
                const rand = Math.trunc(Math.random() * 1000000)

                const otp = new OTP({
                        email : req.body.email,
                        otp : rand
                        })
                    
                        await otp.save()

                sgMail.send({
                    to: req.body.email,  
                    from: 'm3et6041@gmail.com',
                    subject: 'OTP',
                    text: rand.toString()
                    })   
                
                    console.log(rand)
                    
                    res.json({message : 2})
            }
    })
})

router.post('/verify',async(req,res)=>{ 
    const email = req.body.email
    console.log(email)
    
    const otp = await OTP.findOne({email})

    console.log(otp.otp)
    console.log(otp)
    
    if(otp.otp == req.body.otp)
    {
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
    const user = await User.find({email:email})
    console.log(user)

    if(user!= null)
    {
        const rand = Math.trunc(Math.random() * 1000000)
        console.log(rand)
        
        await OTP.update(
            {email:email},
            {$set : { otp : rand}}
        )

    sgMail.send({
    to: req.body.email,  
    from: 'm3et6041@gmail.com',
    subject: 'OTP',
    text: rand.toString()
    })
    
        res.json({message : true})
    }
    else
    {
        res.json({message : false})
    }
})
    
//---------------------------------------------------------------------------------------------

router.get('/delete',(req,res)=>{
    sess = req.session
    if(sess.phone){
        res.sendfile('./view/delete.html')
    }
    else{
        res.json({message : false})
    }
})

router.post('/delete',async (req,res)=>{
    sess = req.session
    if(sess.phone){
        try {
            const user = await User.findUserById(req.body.phone)
            res.json(user)
    
        } catch (e) {
            console.log(e)
            
        }
    }
    else{
        res.json({message : false})
    }
})

router.get('/deleteAll',async (req,res)=>{
    // sess = req.session
    // if(sess.phone){
        const del = await User.deleteMany({})
        res.json(del)
    // }
    // else{
    //     res.json({message : false})
    // }
})

router.get('/show',async (req,res)=>{
    // sess = req.session
    // if(sess.phone){
        try {
             User.find({}).then((err,data)=>{
                if(err){
                    res.json(err)
                }
                else{
                    res.json(data)
              await  }
            })
        } catch (e) {
            const err = new Error(e)
            log(err.message)
        }
    // }
    // else{
    //     res.json({message : false})
    // }
})

// router.post('/registerotp',async (req,res)=>{
//     sess = req.session
//     sess.phone = req.body.phone

//     const user = new User(req.body)
//     await user.save()

//     const rand = Math.trunc(Math.random() * 1000000)
    
//     const otp = new OTP({
//        phone : req.body.phone,
//        otp : rand
//     })
   
//     await otp.save()

//     const from = '918141630915'
//     const to = req.body.phone
//     const text = rand
    
    // nexmo.message.sendSms(from, to, text, (err, responseData) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         if(responseData.messages[0]['status'] === "0") {
    //             console.log("Message sent successfully.")
    //         } else {
    //             console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`)
    //         }
    //     }
    // })   
//     console.log(rand)
    
//     res.json({message : true})
    
// })

module.exports = router