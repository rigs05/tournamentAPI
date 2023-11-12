const express = require('express');
const teamData = require('../controllers/Teams');

const teamRouter = express.Router();

teamRouter.get('/:teamId', teamData.getTeamData);
teamRouter.post('/:teamId', teamData.addTeamData);

module.exports = teamRouter;