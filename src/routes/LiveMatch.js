const express = require('express');
const liveCard = require('../controllers/LiveMatch');

const liveMatchRouter = express.Router();

liveMatchRouter.get("/", liveCard.getLiveCard);
liveMatchRouter.post("/", liveCard.postLiveCard);

module.exports = liveMatchRouter;