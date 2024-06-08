import sqlite3 from 'sqlite3';

const db = new sqlite3.Database("users.db");

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER NOT NULL
)`);

export default db;