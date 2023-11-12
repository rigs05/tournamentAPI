const express = require('express');
const livePoll = require('../controllers/LivePoll');

const livePollRouter = express.Router();

livePollRouter.get('/', livePoll.getPollData);
// livePollRouter.post('/vote', livePoll.postVote);


module.exports = livePollRouter;

// WORKING ON SOCKETS