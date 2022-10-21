const fs = require('fs');
// const myConsole = new console.Console(fs.createWriteStream('./logs.txt'));
const whatsappService = require('../services/whatsappService');

const verifyToken = (req, res) => {
  try {
    var fbIntegrationToken = process.env.FACEBOOK_INTEGRATION_TOKEN;
    var token = req.query['hub.verify_token'];
    var challenge = req.query['hub.challenge'];

    console.log('verifyToken: ', token, challenge);

    if (token === fbIntegrationToken) {
      console.log('ok');
      res.send(challenge);
    } else {
      res.status(400).send();
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};

const recieveMessage = (req, res) => {
  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  if (req.body.object) {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
      whatsappService.processMessage(req);
    }
    res.send('EVENT_RECEIVED');
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    res.send('EVENT_RECEIVED');
  }
};

module.exports = {
  verifyToken,
  recieveMessage,
};
