const db = require("../config/db");

// Create a new user
// const createUser = (username, email, hashedPassword, callback) => {
//   console.log(email);
  
//   const query =
//     "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
//   db.query(query, [username, , email, hashedPassword], (err, results) => {
//     if (err) return callback(err);
//     callback(null, results);
//   });
// };

const createUser = (username, email, hashedPassword, callback) => {
  console.log(email);
  
  const query =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(query, [username, email, hashedPassword], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};


const findUserByEmail = (email, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};



const findUserByUsername = (username, callback) => {
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserByEmail,
};
