const express = require('express')
const router = express.Router()
require("dotenv").config();
const {initPayment, responsePayment} = require("../paytm/services/index")

router.post("/", (req, res) => {
    initPayment(req.query.amount).then(
        
        success => {
            res.json({resultData: success});
        },
        error => {
            res.send(error);
        }
    );
});

router.post("/response", (req, res) => {
    responsePayment(req.body).then(
        success => {
            res.render("../view/response.html", {resultData: "true", responseData: success});
        },
        error => {
            res.send(error);
        }
    );
});

module.exports = router