const https = require('https');

function sendWhatsappMessage(message, msisdn) {
  const data = JSON.stringify({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: msisdn,
    type: 'text',
    text: {
      preview_url: false,
      body: message,
    },
  });

  const options = {
    host: 'graph.facebook.com',
    path: 'v13.0/107626655472154/messages',
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer EAALk0c5xVrQBAHeKeGmdak8mYXGAZCIVROF16ZBbS1xyIndtJjNkvmBmbTQRUyt8toQnWFmSifuZAaEpfFAL1rg0EXwYDEXulmuvZC3ZCGZC9mUZCCDNMhCKZAZCjlHVX0b0e9fn2TPdTNRMEJaRzFWxKOfZAHaADkeLn6fNN8ZBmZAgmV5QUgc8sVDVUeiXHiEGKr0yh7VmQHRM5wZDZD',
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
