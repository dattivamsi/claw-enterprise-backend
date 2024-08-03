const todoModel = require('../models/todoModel');

exports.createTodo = (req, res) => {
  const { description } = req.body;
  todoModel.createTodo(req.user.id, description, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json(result);
  });
};

exports.getTodos = (req, res) => {
  todoModel.getTodosByUserId(req.user.id, (err, todos) => {
    if (err) return res.status(500).json({ error: err });
    res.json(todos);
  });
};

exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const { description, status } = req.body;
  todoModel.updateTodo(id, req.user.id, description, status, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  todoModel.deleteTodo(id, req.user.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(204).send();
  });
};
