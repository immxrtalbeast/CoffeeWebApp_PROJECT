import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к файлу базы данных SQLite
const dbPath = path.join(__dirname, 'database.sqlite');
console.log('Database path:', dbPath); // для отладки

// Создание подключения к базе данных
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});


export const getQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export const getGoods = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM Goods', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export const getvolume_price = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM volume_price', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export const getadd_to_coffee = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM add_to_coffee', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export default db;