const https = require('https');
const whatsappHelper = require('../helpers/whatsappHelper');

function processMessage(payload) {
  let messageObj = payload.body.entry[0].changes[0].value.messages[0];
  let msisdn = messageObj.from;

  console.log('processMessage: ', msisdn, messageObj);

  const message = getUserMessage(messageObj);
  
  // const data = whatsappHelper.buildTextMessage(msisdn, `You said: ${message}`);
  const btn1 = whatsappHelper.getButtonItem('btn1', 'Button 1');
  const btn2 = whatsappHelper.getButtonItem('btn2', 'Button 2');
  const header = 'Button Message';
  const body = 'This is a button message';
  const footer = 'Select an option';
  const data = whatsappHelper.buildButtonMessage(msisdn, header, body, footer, [btn1, btn2]);

  sendWhatsappMessage(data);
}

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

function sendWhatsappMessage(data) {
  const options = {
    host: 'graph.facebook.com',
    path: `/v15.0/${process.env.PHONE_NUMBER_ID}/messages`,
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.FACEBOOK_ACCESS_TOKEN}`,
    },
  };

  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
}

module.exports = {
  sendWhatsappMessage,
  processMessage,
};
