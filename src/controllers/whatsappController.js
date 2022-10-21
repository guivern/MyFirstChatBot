const fs = require('fs');
// const myConsole = new console.Console(fs.createWriteStream('./logs.txt'));
const whatsappService = require('../services/whatsappService');

const verifyToken = (req, res) => {
  try {
    var accessToken = 'AKJ55ADSA6S1JLMN6QWASDC6Q';
    var token = req.query['hub.verify_token'];
    var challenge = req.query['hub.challenge'];

    console.log('verifyToken: ', token, challenge);

    if (token === accessToken) {
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
      let phone_number_id =
        req.body.entry[0].changes[0].value.metadata.phone_number_id;
      let message = req.body.entry[0].changes[0].value.messages[0];
      let from = message.from; // extract the phone number from the webhook payload
      let msg_body = message.text.body; // extract the message text from the webhook payload

      // myConsole.log(message);

      let userMessage = getUserMessage(message);

      console.log('recieveMessage: ', userMessage);

      whatsappService.sendWhatsappMessage(userMessage, from);
    }
    res.send("Event Received");
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    res.send("Event Received");
  }
};

function getUserMessage(message) {
  let text = '';
  let type = message['type'];

  if (type === 'text') {
    text = message['text']['body'];
  } else if (type == 'interactive') {
    let interactiveObj = message['interactive'];
    let interactiveType = interactiveObj['type'];

    if (interactiveType === 'button_reply') {
      text = interactiveObj['button_reply']['title'];
    } else if (interactiveType === 'list_reply') {
      text = interactiveObj['list_reply']['title'];
    }
  } else {
    text = 'Unsupported message type';
  }

  return text;
}

module.exports = {
  verifyToken,
  recieveMessage,
};
