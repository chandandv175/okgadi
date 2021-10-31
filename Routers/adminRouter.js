import express, { Router } from 'express';
import { adminController } from '../Controllers/adminController.js'
import * as middleware from '../Middlewares/authHandler.js'

const router = Router();
/**
 * @swagger
 * /admin/v1/login:
 *   post:
 *     tags:
 *       - Web API :- ADMIN MANAGEMENT
 *     description: Creating Docs for admin login with JWT token
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
router.post('/login', adminController.login);

/**
 * @swagger
 * /admin/v1/signup:
 *   post:
 *     tags:
 *       - Web API :- ADMIN MANAGEMENT
 *     description: Creating Docs for admin signup
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
 *         description: user role is required.
 *         type: string
 *         enum: [user,admin,driver,owner]
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
router.post('/signup', adminController.signup);

/**
 * @swagger
 * /admin/v1/getProfile:
 *   get:
 *     tags:
 *       - Web API :- ADMIN MANAGEMENT
 *     description: Creating Docs for admin profile with JWT token
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
 *       401:
 *          description: unauthrized
 */

router.get('/getProfile', middleware.verifyToken,adminController.getProfile);


/**
 * @swagger
 * /admin/v1/getUserList:
 *   get:
 *     tags:
 *       - Web API :- ADMIN MANAGEMENT
 *     description: Creating Docs for admin profile with JWT token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         description: search is optional . 
 *         in: query
 *         required: false
 *       - name: page
 *         description: page is requried . 
 *         in: query
 *         required: false
 *       - name: limit
 *         description: limit is requried . 
 *         in: query
 *         required: false
 *       - name: status
 *         description: status is optional (eg.active / blocked ) . 
 *         type: string
 *         enum: [active,blocked]
 *         in: query
 *         required: false
 *       - name: userId
 *         description: user id is optional . 
 *         in: query
 *         required: false
 *     responses:
 *       200: 
 *         description: Otp verify successfully.
 *       500:
 *         description: Internal server error.
 *       501:
 *         description: Something went wrong.
 *       404:
 *          description: User Not found
 *       401:
 *          description: unauthrized
 */

 router.get('/getUserList',adminController.getUserList);


/**
 * @swagger
 * /admin/v1/changeUserStatus:
 *   post:
 *     tags:
 *       - Web API :- ADMIN MANAGEMENT
 *     description: Creating Docs for change user status
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userStatus
 *         description: user status is required.
 *         type: string
 *         enum: [active,blocked , deleted]
 *         in: formData
 *         required: true
 *       - name: id
 *         description: user id is required.
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
 *       401:
 *          description: unauthrized
 */

 router.post('/changeUserStatus', middleware.verifyToken,adminController.changeUserStatus);


/**
 * @swagger
 * /admin/v1/verifyProfile:
 *   post:
 *     tags:
 *       - Web API :- ADMIN MANAGEMENT
 *     description: Creating Docs for verify profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email is required.
 *         in: formData
 *         required: true
 *       - name: confirmationCode
 *         description: confirmation code is requried.
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
 *       401:
 *          description: unauthrized
 */

 router.post('/verifyProfile', adminController.verifyProfile);


/**
 * @swagger
 * /admin/v1/forgotPassword:
 *   post:
 *     tags:
 *       - Web API :- ADMIN MANAGEMENT
 *     description: Creating Docs for forgot password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email is required.
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
 *       401:
 *          description: unauthrized
 */

 router.post('/forgotPassword', adminController.forgotPassword);


export { router as adminRouter };


