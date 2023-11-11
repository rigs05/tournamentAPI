const express = require('express');
const scheduleModule = require('../controllers/schedule');

const scheduleRouter = express.Router();

scheduleRouter.get('/', scheduleModule.getSchedule);
scheduleRouter.post('/', scheduleModule.addSchedule);

module.exports = scheduleRouter;