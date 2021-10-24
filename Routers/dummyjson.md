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
 *       - name: body
 *         description: body is required.
 *         in: body
 *         required: true
 *     responses:
 *       200: 
 *         description: Otp verify successfully.
 *       500:
 *         description: Internal server error.
 *       501:
 *         description: Something went wrong.
 */