const express = require('express');
const userRouter = express.Router();
const userAuth = require('../controllers/auth');

userRouter.post('/signup', userAuth.registerUser);
userRouter.post('/login', userAuth.userLogin);
userRouter.post('/reset-password', userAuth.resetPassword);

module.exports = userRouter;