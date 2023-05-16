const express = require('express');
const router = express.Router();

const myController = require('../controllers/index')

router.get('/', myController.getTeamData);

router.get('/:id', myController.getTeamObject);

router.post('/', myController.createTeam);


module.exports = router;