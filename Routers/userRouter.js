import express from 'express';
import { userController } from '../Controllers/userController.js'
let router = express.Router();

export const userRouter =  router.post('/login', userController.login)