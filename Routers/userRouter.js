import express, { Router } from 'express';
import { userController } from '../Controllers/userController.js'

const router = Router()
router.post('/login', userController.login);
router.post('/signup', userController.signup);

export { router as Router };


