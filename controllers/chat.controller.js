const express = require('express')
const router = express.Router()

router.get('/',async(req,res)=>{
  const dialogflow = require('dialogflow');
  const uuid = require('uuid');

  /**
   * Send a query to the dialogflow agent, and return the query result.
   
   */
    // A unique identifier for the given session
    const sessionId = uuid.v4();

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient({
      keyFilename : "cred.json"
    });
    const sessionPath = sessionClient.sessionPath('diabot-87169', sessionId);

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: req.body.input,
          languageCode: 'en-US',
        },
      },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    res.send(result.fulfillmentText)
})

module.exports = router