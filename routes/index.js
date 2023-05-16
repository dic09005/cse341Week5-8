
const express = require('express');
const router = express.Router();


router.use('/', require('./swagger'));
router.use('/players', require('./players'));
router.use('/teams', require('./teams'));

module.exports = router;