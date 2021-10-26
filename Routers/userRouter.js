import express, { Router } from 'express';
import { userController } from '../Controllers/userController.js'
import * as middleware from '../Middlewares/authHandler.js'

const router = Router();
/**
 * @swagger
 * /user/v1/login:
 *   post:
 *     tags:
 *       - Mobile API :- USER MANAGEMENT
 *     description: Creating Docs for user login with JWT token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email is required.
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password is required.
 *         in: formData
 *         required: true
 *     responses:
 *       200: 
 *         description: Otp verify successfully.
 *       500:
 *         description: Internal server error.
 *       501:
 *         description: Something went wrong.
 *       404:
 *          description: User Not found
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /user/v1/signup:
 *   post:
 *     tags:
 *       - Mobile API :- USER MANAGEMENT
 *     description: Creating Docs for user signup
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email is required.
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password is required.
 *         in: formData
 *         required: true
 *       - name: userName
 *         description: userName is required.
 *         in: formData
 *         required: true
 *       - name: location
 *         description: location is option.
 *         in: formData
 *         required: false
 *       - name: userRole
 *         description: location is required.
 *         in: formData
 *         required: true
 *     responses:
 *       200: 
 *         description: signup successfull.
 *       500:
 *         description: Internal server error.
 *       501:
 *         description: Something went wrong.
 *       400:
 *          description: Bad request
 *       404:
 *          description: Not found
 * 
 */
router.post('/signup', userController.signup);
/**
 * @swagger
 * /user/v1/getUserProfile:
 *   get:
 *     tags:
 *       - Mobile API :- USER MANAGEMENT
 *     description: Creating Docs for user profile with JWT token
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *         description: Otp verify successfully.
 *       500:
 *         description: Internal server error.
 *       501:
 *         description: Something went wrong.
 *       404:
 *          description: User Not found
 */

router.get('/getUserProfile', middleware.verifyToken,userController.getUserProfile);


export { router as Router };


