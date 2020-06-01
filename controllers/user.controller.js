const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const User = mongoose.model('User') 
const UserTemp = mongoose.model('UserTemp') 
const OTP = mongoose.model('OTP')
const UserVehicle = mongoose.model('UserVehicle')
const Service = mongoose.model('Service')
process.env.TZ = 'Asia'

router.post('/registerotp',async(req,res)=>{
  const user = new UserTemp(req.body)

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
    else
    {
      const rand = Math.trunc(Math.random() * 1000000)
      const otp = new OTP({
        email : req.body.email,
        otp : rand
      })
          
      await otp.save()
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

      console.log(rand)
      res.json({message : 2})
    }
  })
})

router.post('/verifyregister',async(req,res)=>{ 
  const email = req.body.email
  const otp = await OTP.findOne({email:email})

  if(otp.otp == req.body.otp)
  {
    const user = new User(req.body)
    await user.save(async(err)=>{
      if(err)
      {
        res.send(err)
      }
      else
      {
        const rand = Math.trunc(Math.random() * 1000000)
        await OTP.updateOne(
          {email:email},
          {$set : {otp : rand}}
        )
        res.json({message : true})
      }
    })
  }
  else
  {
    res.json({message : false})
  }
})

router.post('/verifylogin',async(req,res)=>{ 
  const email = req.body.email
  const otp = await OTP.findOne({email:email})
  console.log(req.body);
  
  const vehicle = await UserVehicle.findOne({email:email})
  if(otp.otp == req.body.otp)
  { 
    const rand = Math.trunc(Math.random() * 1000000)
    await OTP.updateOne(
      {email:email},
      {$set : {otp : rand}}
    )
    res.json({message : true,address : vehicle.address, lat : vehicle.lat, lng : vehicle.lng})
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

  if(Object.keys(user).length != 0 )
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

router.get('/name', callName)
  
function callName(req, res) { 
      
  // Use child_process.spawn method from  
  // child_process module and assign it 
  // to variable spawn 
  var spawn = require("child_process").spawn
    
  // Parameters passed in spawn - 
  // 1. type_of_script 
  // 2. list containing Path of the script 
  //    and arguments for the script  
    
  // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will 
  // so, first name = Mike and last name = Will 
  var process = spawn('python',["./view/python.py"])

  // Takes stdout data from script which executed 
  // with arguments and send this data to res object 
  process.stdout.on('data', function(data) { 
      res.send(data.toString())
  } ) 
} 

router.post('/deleteacc',async(req,res)=>{
  const email = req.body.email

  await UserTemp.deleteOne({email : email})
  await OTP.deleteOne({email : email})
  await User.deleteOne({email : email})
  await UserVehicle.deleteMany({email : email})
  await Service.deleteMany({email : email})

  res.send("ok")
})

router.get('/',(req,res)=>{
  var someDate = new Date();
  var numberOfDaysToAdd = 12;
  someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
  console.log(someDate);
})

router.post('/deltemp',async(req,res)=>{
  const email = req.body.email
  await UserTemp.deleteOne({email : email})
  res.json({message : true})
})

module.exports = router