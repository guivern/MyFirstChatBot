const express = require('express');
const router = require('./routes/routes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/whatsapp', router);
app.listen(port, () => console.log(`Listening on port ${port}...`));