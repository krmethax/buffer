// database.js
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost', // ปรับให้ตรงกับการตั้งค่าฐานข้อมูลของคุณ
  user: 'root', // ชื่อผู้ใช้ฐานข้อมูล
  password: '', // รหัสผ่านฐานข้อมูล
  database: 'buffet', // ชื่อฐานข้อมูล
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

export default connection;
