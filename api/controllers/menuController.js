import connection from '../db/database.js';
import { check, validationResult } from 'express-validator'; // Import the necessary functions

// Get all menus
export const getMenu = (req, res) => {
  connection.query('SELECT * FROM menu', (error, results) => {
    if (error) return res.status(500).json({ error });
    res.json(results);
  });
};

// Add a new menu item
export const addMenu = (req, res) => {
  const { name, category_id, price, image_url } = req.body;
  const query = 'INSERT INTO menu (name, category_id, price, image_url) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, category_id, price, image_url], (error, results) => {
    if (error) return res.status(500).json({ error });
    res.status(201).json({ id: results.insertId, name, category_id, price, image_url });
  });
};

// Update a menu item
// Update a menu item
export const updateMenuItem = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  connection.query('UPDATE menu SET ? WHERE id = ?', [updatedData, id], (error, results) => {
    if (error) return res.status(500).json({ error });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Menu item not found' });
    res.json({ message: 'Menu item updated successfully' });
  });
};

// Get menu item by ID
export const getMenuById = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM menu WHERE id = ?', [id], (error, results) => {
    if (error) return res.status(500).json({ error });
    if (results.length === 0) return res.status(404).json({ message: 'Menu item not found' });
    res.json(results[0]);
  });
};

// Delete a menu item
export const deleteMenu = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM menu WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) return res.status(500).json({ error });
    res.status(204).send(); // No content to return
  });
};
