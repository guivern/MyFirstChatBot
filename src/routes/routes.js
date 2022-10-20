const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappController');

router.get('/', whatsappController.verifyToken)
router.post('/', whatsappController.recieveMessage);

module.exports = router;