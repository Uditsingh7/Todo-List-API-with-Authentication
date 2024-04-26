const express = require('express');
const { signUpUser, loginUser } = require('../controllers/userController');

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: User Controller 
 *   description: APIs for user management
 */

/**
 * @openapi
 * /api/v1/user/signup:
 *   post:
 *     tags:
 *       - User Controller
 *     summary: Create a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 default: johndoe@mail.com
 *               password:
 *                 type: string
 *                 default: johnDoe20!@
 *               firstName:
 *                  type: string
 *                  default: John
 *               lastName:
 *                  type: string
 *                  default: travolta
 *               mobileNumber:
 *                  type: string
 *                  default: 1234567890
 *     responses:
 *       '201':
 *         description: Created
 *       '409':
 *         description: Conflict
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Server Error
 */
router.post('/signup', signUpUser);

/**
 * @openapi
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - User Controller 
 *     summary: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 default: johndoe@mail.com
 *               password:
 *                 type: string
 *                 default: johnDoe20!@
 *     responses:
 *       '200':
 *         description: Logged in successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Server Error
 */
router.post('/login', loginUser);

module.exports = router;
