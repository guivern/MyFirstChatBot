const verifyToken = (req, res) => {
  try {
    var accessToken = 'AKJ55ADSA6S1JLMN6QWASDC6Q';
    var token = req.query['hub.verify_token'];
    var challenge = req.query['hub.challenge'];

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
  console.log(req.body);
  res.send('Hi from recieveMessage');
};

module.exports = {
  verifyToken,
  recieveMessage,
};
