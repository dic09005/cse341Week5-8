const express = require('express');
const router = express.Router();

const myController = require('../controllers/index')

router.get('/', myController.getPlayerData);

router.get('/:id', myController.getPlayerObject);

router.post('/', myController.createPlayer);


module.exports = router;