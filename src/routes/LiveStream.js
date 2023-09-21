const express = require("express");
const liveStreamController = require("../controllers/liveStreamController");

const liveStreamRouter = express.Router();

liveStreamRouter.get("/", liveStreamController.getLiveStreams);
liveStreamRouter.post("/", liveStreamController.addLiveStream);
liveStreamRouter.put("/:liveStreamId", liveStreamController.updateLiveStream); 

module.exports = liveStreamRouter;