const express = require('express')
const router = express.Router()
const https = require('https');
const checksum_lib = require('../Paytm_App_Checksum_Kit_NodeJs-master/paytm/checksum');

router.get('/',(req,res)=>{
    var paytmParams = {};
paytmParams.body = {

    /* for custom checkout value is 'Payment' and for intelligent router is 'UNI_PAY' */
    "requestType" : "Payment",

    /* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
    "mid" : "DCjKyN62993935423467",

    /* Find your Website Name in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
    "websiteName" : "WEBSTAGING",

    /* Enter your unique order id */
    "orderId" : "ORD001",

    /* on completion of transaction, we will send you the response on this URL */
    "callbackUrl" : "http://localhost:3000/response",

    /* Order Transaction Amount here */
    "txnAmount" : {

        /* Transaction Amount Value */
        "value" : "1",

        /* Transaction Amount Currency */
        "currency" : "RS",
    },

    /* Customer Infomation here */
    "userInfo" : {

        /* unique id that belongs to your customer */
        "custId" : "CUST001",
    },
};

checksum_lib.genchecksumbystring(JSON.stringify(paytmParams.body), "1KA%5NB@aAAXJG5l", function(err, checksum){

    /* head parameters */
    paytmParams.head = {
        
        /* put generated checksum value here */
        "signature"	: checksum
    };

    /* prepare JSON string for request */
    var post_data = JSON.stringify(paytmParams);

    var options = {

        /* for Staging */
        hostname: 'securegw-stage.paytm.in',

        /* for Production */
        // hostname: 'securegw.paytm.in',

        port: 443,
        path: '/theia/api/v1/initiateTransaction?mid=YOUR_MID_HERE&orderId=YOUR_ORDER_ID',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        }
    };

    // Set up the request
    var response = "";
    var post_req = https.request(options, function(post_res) {
        post_res.on('data', function (chunk) {
            response += chunk;
        });

        post_res.on('end', function(){
            console.log('Response: ', response);
        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();
});
})

router.post('/response',(req,res)=>{
    res.send('../view/response.html')
})

module.exports = router