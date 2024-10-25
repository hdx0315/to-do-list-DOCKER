// backend/routes/todoRoutes.js
const express = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const router = express.Router();

router.get('/', getTodos);
router.post('/', createTodo);

router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

// Update task
router.put('/:id', updateTodo);

module.exports = router;