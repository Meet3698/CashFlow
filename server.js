require('./models/db')

const express = require('express')
const port = process.env.PORT || 3000
const UserController = require('./controllers/user.controller')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const http = require('http');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

server = http.createServer(function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
})
app.use('/',UserController)

// app.use((req,res,next)=>{
//     console.log(req.method,req.path);
//     next()    
// })

app.listen(port,()=>{
    console.log("listening on "+port);
})