const https = require('https');

function sendWhatsappMessage(message, msisdn) {
  const data = JSON.stringify({
    messaging_product: 'whatsapp',
    to: msisdn,
    type: 'text',
    text: {
      body: `You said: ${message}`,
    },
  });

  const options = {
    host: 'graph.facebook.com',
    path: `/v15.0/${process.env.PHONE_NUMBER_ID}/messages`,
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        `Bearer ${process.env.FACEBOOK_ACCESS_TOKEN}`,
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
};
