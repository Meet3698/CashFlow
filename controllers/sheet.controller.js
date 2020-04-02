const express = require('express')
const router = express.Router()
const fs = require('fs');

router.post('/write',(req,res)=>{
    console.log(req.body);
    
    const jsn = req.body
    console.log("json-chat",jsn);

    let data='';
    for (i = 0; i < jsn.length; i++) {
        data=data+jsn.email+'\t'+jsn.num+'\t'+jsn.orderno+'\t'+jsn.type+'\t'+jsn.complaint+'\n';
     }
    
    fs.appendFile('new.xls', data, (err) => {
        if (err) throw err;
        console.log('File created');
     });
})

router.get('/download',(req,res)=>{ 
    res.download('new.xls')
})
module.exports = router