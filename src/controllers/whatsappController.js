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
  let body = req.body;

  // Check the Incoming webhook message
  console.log(JSON.stringify(req.body, null, 2));
  
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
      let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
      let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
      axios({
        method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
        url:
          'https://graph.facebook.com/v12.0/' +
          phone_number_id +
          '/messages?access_token=' +
          token,
        data: {
          messaging_product: 'whatsapp',
          to: from,
          text: { body: 'Ack: ' + msg_body },
        },
        headers: { 'Content-Type': 'application/json' },
      });
    }
    res.sendStatus(200);
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    res.sendStatus(404);
  }
};

module.exports = {
  verifyToken,
  recieveMessage,
};
