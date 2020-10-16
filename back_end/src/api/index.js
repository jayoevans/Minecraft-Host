const express = require('express');
const minecraft = require('./minecraft');
const login = require('./login');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});
router.use('/minecraft',minecraft);
router.use('/login',login);

module.exports = router;
