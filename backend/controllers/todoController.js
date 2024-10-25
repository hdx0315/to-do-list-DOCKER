

const Todo = require('../models/Todo');

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  const todo = new Todo({
    task: req.body.task
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a todo
// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id, 
      {
        task: req.body.task,
        completed: req.body.completed
      },
      { new: true } // Return the updated document
    );

    if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });

    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Delete a todo
// Updated deleteTodo controller
exports.deleteTodo = async (req, res) => {
  console.log('delete controller ', req.params.id);
  try {
    console.log('delete controller try', req.params.id);
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    res.json({ message: 'Todo deleted' }); // Send a response indicating success
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

