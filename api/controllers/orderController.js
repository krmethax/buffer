// controllers/orderController.js
import connection from '../db/database.js';

export const createOrder = (req, res) => {
  const { tableNumber, items } = req.body;

  // Validate tableNumber and items
  if (!tableNumber || !items || items.length === 0) {
    return res.status(400).json({ message: 'Invalid order data' });
  }

  // SQL query to insert order
  const orderQuery = 'INSERT INTO orders (table_number, items) VALUES (?, ?)';
  
  // Execute the query
  connection.query(orderQuery, [tableNumber, JSON.stringify(items)], (error, results) => {
    if (error) {
      // Improved error logging
      console.error('Error inserting order:', error.code, error.sqlMessage); // Log detailed error
      return res.status(500).json({ message: 'Failed to create order', error: error.sqlMessage });
    }
    
    // Successful order creation response
    res.status(201).json({ message: 'Order created successfully', orderId: results.insertId });
  });
};

export const getOrders = (req, res) => {
  // SQL query to get all orders
  connection.query('SELECT * FROM orders', (error, results) => {
    if (error) {
      // Improved error logging
      console.error('Error retrieving orders:', error.code, error.sqlMessage); // Log detailed error
      return res.status(500).json({ message: 'Failed to retrieve orders', error: error.sqlMessage });
    }
    
    // Return the results
    res.json(results);
  });
};
