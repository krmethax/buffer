import connection from '../db/database.js';

// Get all tables
export const getTables = (req, res) => {
  console.log('Fetching all tables...');
  connection.query('SELECT * FROM tables', (error, results) => {
    if (error) {
      console.error('Error fetching tables:', error);
      return res.status(500).json({ error });
    }
    res.json(results);
  });
};

// Get a single table by ID
export const getTableById = (req, res) => {
  const tableId = req.params.id;
  connection.query('SELECT * FROM tables WHERE id = ?', [tableId], (error, results) => {
    if (error) return res.status(500).json({ error });
    if (results.length === 0) {
      return res.status(404).json({ message: 'Table not found' });
    }
    res.json(results[0]);
  });
};

// Create a new table
export const createTable = (req, res) => {
  const { table_number } = req.body; // Only get table_number

  // Check if table_number is provided
  if (!table_number) {
    return res.status(400).json({ message: 'หมายเลขโต๊ะต้องถูกต้อง' }); // Bad request if not provided
  }

  connection.query('INSERT INTO tables (table_number) VALUES (?)', [table_number], (error, results) => {
    if (error) {
      console.error('Error creating table:', error);
      return res.status(500).json({ error });
    }
    res.status(201).json({ message: 'Table created successfully', id: results.insertId });
  });
};

// Update a table by ID
export const updateTable = (req, res) => {
  const tableId = req.params.id; // Get the table ID from the request parameters
  const { table_number } = req.body; // Get only table_number from request body

  // Check if table_number is provided
  if (!table_number) {
    return res.status(400).json({ message: 'หมายเลขโต๊ะต้องถูกต้อง' }); // Bad request if not provided
  }

  connection.query(
    'UPDATE tables SET table_number = ? WHERE id = ?',
    [table_number, tableId],
    (error, results) => {
      if (error) {
        console.error('Error updating table:', error);
        return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลโต๊ะ' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'ไม่พบโต๊ะที่ต้องการแก้ไข' });
      }
      res.json({ message: 'ข้อมูลโต๊ะได้ถูกบันทึกเรียบร้อยแล้ว.' });
    }
  );
};

// Delete a table by ID
export const deleteTable = (req, res) => {
  const tableId = req.params.id;

  connection.query('DELETE FROM tables WHERE id = ?', [tableId], (error, results) => {
    if (error) return res.status(500).json({ error });
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Table not found' });
    }
    res.json({ message: 'Table deleted successfully' });
  });
};
