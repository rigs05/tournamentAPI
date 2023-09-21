const express = require("express");
const fixtureController = require("../controllers/fixtureController");

const fixtureRouter = express.Router();

fixtureRouter.get("/", fixtureController.getFixtures);
fixtureRouter.post("/", fixtureController.addFixture); 
fixtureRouter.put("/:fixtureId", fixtureController.updateFixture); 

module.exports = fixtureRouter;