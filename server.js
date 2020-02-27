require('./models/db')

const express = require('express')
const port = process.env.PORT || 3000

const UserController = require('./controllers/user.controller')
const UserVehicleController = require('./controllers/userVehicle.controller')
const PackageController = require('./controllers/package.controller')
const ImageController = require('./controllers/image.controller')
const ServiceController = require('./controllers/service.controller')
const BatchController = require('./controllers/batch_making.controller')
const PaymentController = require('./controllers/payment.controller')
const Pay = require('./controllers/payment')
const ProfileController = require('./controllers/profile.conroller')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
app.use(session({secret : 'Harry5972',saveUninitialized:true,resave:true}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use('/',UserController)
app.use('/package',PackageController)
app.use('/uservehicle',UserVehicleController)
app.use('/image',ImageController)
app.use('/service',ServiceController)
app.use('/batch',BatchController)
app.use('/payment',PaymentController)
app.use('/profile',ProfileController)

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.listen(port,()=>{
    console.log("listening on "+port);
})

module.exports = session