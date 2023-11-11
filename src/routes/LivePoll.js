const express = require('express');
const livePoll = require('../controllers/LivePoll');

const livePollRouter = express.Router();

livePollRouter.get('/', async (req, res) => {
    
});

module.exports = livePollRouter;