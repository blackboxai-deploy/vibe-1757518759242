// Simple database initialization script
const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

console.log('Initializing database...');

const db = new Database('./database.sqlite');

// Enable foreign keys and WAL mode
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

console.log('Creating tables...');

// Users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('admin', 'petugas_pkp', 'ar')) NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// Check if admin exists
const adminExists = db.prepare('SELECT COUNT(*) as count FROM users WHERE role = ?').get('admin');

if (adminExists.count === 0) {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.prepare(`
    INSERT INTO users (nama, username, password, role)
    VALUES (?, ?, ?, ?)
  `).run('Administrator', 'admin', hashedPassword, 'admin');
  
  console.log('✅ Admin user created (username: admin, password: admin123)');
} else {
  console.log('✅ Admin user already exists');
}

db.close();
console.log('✅ Database initialized successfully!');