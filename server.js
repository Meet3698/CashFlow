require('./models/db')

const express = require('express')
const port = process.env.PORT || 3000
const UserController = require('./controllers/user.controller')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/',UserController)

// app.use((req,res,next)=>{
//     console.log(req.method,req.path);
//     next()    
// })

app.listen(port,()=>{
    console.log("listening on "+port);
})