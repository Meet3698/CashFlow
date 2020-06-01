const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const path   = require('path')

const mongoose = require('mongoose')
const Image = mongoose.model('Image')

router.use(express.static('public'))

const storage = multer.diskStorage({
    destination: './public',
    filename: function(req, file, fn){
      fn(null,  new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname))
    }
  }) 

const upload =  multer({
storage: storage,
fileFilter: function(req, file, callback){
    validateFile(file, callback)
}
}).single('img')

const validateFile = function(file, cb ){
    allowedFileTypes = /jpeg|jpg|png|gif/
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType  = allowedFileTypes.test(file.mimetype)
    if(extension && mimeType){
      return cb(null, true)
    }else{
      cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
    }
  }

router.get('/',(req,res,)=>{
    res.sendfile('./view/upload.html')
})

router.post('/upload',(req, res)=>{
    
    upload(req, res,(error) => {
        
        if(error)
        {
            res.send(error)
        }
        const document = {
            name : req.file.filename
        }

        const image = new Image(document)
        image.save((error)=>{
            if(error){ 
            throw error 
            }
            res.redirect('/image')
        })
    })
})

router.post('/get',(req,res)=>{
  fs.readdir('./public',(err,item)=>{
    res.send(item)
  })
})
module.exports = router
