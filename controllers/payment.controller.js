const express = require('express')
const router = express.Router()
require("dotenv").config();
const {initPayment, responsePayment} = require("../paytm/services/index")

router.get("/", (req, res) => {
    initPayment(req.query.amount).then(
        
        success => {
            res.render("../view/paytmRedirect.html", {
                resultData: success,
                paytmFinalUrl: 'https://securegw-stage.paytm.in/order/process'
            });
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