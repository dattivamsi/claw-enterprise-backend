const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authenticateJWT = require('../middleware/authenticateJWT');

router.post('/', authenticateJWT, todoController.createTodo);
router.get('/', authenticateJWT, todoController.getTodos);
router.put('/:id', authenticateJWT, todoController.updateTodo);
router.delete('/:id', authenticateJWT, todoController.deleteTodo);

module.exports = router;
