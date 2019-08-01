require('./models/db')

const express = require('express')
const port = process.env.PORT || 3000
const UserController = require('./controllers/user.controller')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use('/',UserController)

// app.use((req,res,next)=>{
//     console.log(req.method,req.path);
//     next()    
// })

app.listen(port,()=>{
    console.log("listening on "+port);
})