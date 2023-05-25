const express = require('express');
const router = express.Router();

const myController = require('../controllers/index')
const validation = require('../middleware/validation');

router.get('/', myController.getPlayerData);

router.get('/:id', myController.getPlayerObject);

router.post('/', myController.createPlayer);

router.put('/:id', validation.savePlayer, myController.updatePlayer);

router.delete('/:id', myController.deletePlayer);


module.exports = router;