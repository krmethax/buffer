// controllers/categoryController.js
import connection from '../db/database.js';

export const getCategories = (req, res) => {
  connection.query('SELECT * FROM categories', (error, results) => {
    if (error) return res.status(500).json({ error });
    res.json(results);
  });
};
    