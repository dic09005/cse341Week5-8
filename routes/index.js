
const { auth } = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
  };

const express = require('express');
const router = express.Router();

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));
router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

router.use('/', require('./swagger'));
router.use('/players', require('./players'));
router.use('/teams', require('./teams'));

module.exports = router; 