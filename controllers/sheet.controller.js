const express = require('express')
const router = express.Router()
const fs = require('fs');

router.post('/write',(req,res)=>{
    console.log(req.body);
    
    const jsn = [{
        "name": "Nilesh",
        "school": "RDTC",
        "marks": "77"
       },{
        "name": "Sagar",
        "school": "RC",
        "marks": "99.99"
       },{
        "name": "Prashant",
        "school": "Solapur",
        "marks": "100"
     }];
    
    let data='';
    for (i = 0; i < jsn.length; i++) {
        data=data+jsn[i].name+'\t'+jsn[i].school+'\t'+jsn[i].marks+'\n';
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