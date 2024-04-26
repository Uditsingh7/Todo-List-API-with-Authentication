const express = require('express');
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController')

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: User Controller 
 *   description: APIs for user management
 */

/**
 * @openapi
 * /api/v1/todos:
 *   post:
 *     tags:
 *       - Todo Controller
 *     summary: Create a todo task for a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       '201':
 *         description: Created
 *       '409':
 *         description: Conflict
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Server Error
 *     security:
 *       - bearerAuth: []
 */
router.post('/', createTodo);

/**
 * @openapi
 * /api/v1/todos:
 *   get:
 *     tags:
 *       - Todo Controller
 *     summary: Get all todos
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Server Error
 *     security:
 *       - bearerAuth: []
 */

router.get('/', getTodos);

/**
 * @openapi
 * /api/v1/todos/{id}:
 *   put:
 *     tags:
 *       - Todo Controller
 *     summary: Update a todo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       '200':
 *         description: Updated
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Server Error
 *     security:
 *       - bearerAuth: []
 */



router.put('/:id', updateTodo);

/**
 * @openapi
 * /api/v1/todos/{id}:
 *   delete:
 *     tags:
 *       - Todo Controller
 *     summary: Delete a todo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Deleted
 *       '404':
 *         description: Not Found
 *       '500':
 *         description: Server Error
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', deleteTodo);

module.exports = router;
