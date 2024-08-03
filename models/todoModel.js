const db = require('../config/db');

// Create a new to-do item
const createTodo = (userId, description, callback) => {
  const query = 'INSERT INTO todos (user_id, description) VALUES (?, ?)';
  db.query(query, [userId, description], (err, results) => {
    if (err) return callback(err);
    callback(null, { id: results.insertId, description, status: 'pending' });
  });
};

// Get all to-do items for a user
const getTodosByUserId = (userId, callback) => {
  const query = 'SELECT * FROM todos WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Update a to-do item
const updateTodo = (id, userId, description, status, callback) => {
  const query = 'UPDATE todos SET description = ?, status = ? WHERE id = ? AND user_id = ?';
  db.query(query, [description, status, id, userId], (err, results) => {
    if (err) return callback(err);
    if (results.affectedRows === 0) return callback(new Error('To-do not found'));
    callback(null, { id, description, status });
  });
};

// Delete a to-do item
const deleteTodo = (id, userId, callback) => {
  const query = 'DELETE FROM todos WHERE id = ? AND user_id = ?';
  db.query(query, [id, userId], (err, results) => {
    if (err) return callback(err);
    if (results.affectedRows === 0) return callback(new Error('To-do not found'));
    callback(null);
  });
};

module.exports = {
  createTodo,
  getTodosByUserId,
  updateTodo,
  deleteTodo
};
