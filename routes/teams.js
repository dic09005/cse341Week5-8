const express = require('express');
const router = express.Router();

const myController = require('../controllers/index')
const validation = require('../middleware/validation');

router.get('/', myController.getTeamData);

router.get('/:id', myController.getTeamObject);

router.post('/', myController.createTeam);

router.put('/:id', validation.saveTeam, myController.updateTeam);

router.delete('/:id', myController.deleteTeam);


module.exports = router;