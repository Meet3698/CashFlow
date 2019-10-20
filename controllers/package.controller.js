const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.sendfile('./view/index.html')
})

module.exports = router