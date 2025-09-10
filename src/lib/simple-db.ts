import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import bcrypt from 'bcryptjs';

// Simple file-based database for sandbox development
interface Database {
  users: Array<{
    id: number;
    nama: string;
    username: string;
    password: string;
    role: 'admin' | 'petugas_pkp' | 'ar';
    created_at: string;
    updated_at: string;
  }>;
  lastUserId: number;
}

const dbPath = join(process.cwd(), 'simple-db.json');

function initDB(): Database {
  return {
    users: [],
    lastUserId: 0
  };
}

function loadDB(): Database {
  if (!existsSync(dbPath)) {
    const db = initDB();
    // Create default admin user
    const adminUser = {
      id: 1,
      nama: 'Administrator',
      username: 'admin',
      password: bcrypt.hashSync('admin123', 10),
      role: 'admin' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    db.users.push(adminUser);
    db.lastUserId = 1;
    
    saveDB(db);
    console.log('✅ Simple database created with admin user (username: admin, password: admin123)');
    return db;
  }
  
  try {
    const data = readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Database load error:', error);
    const db = initDB();
    saveDB(db);
    return db;
  }
}

function saveDB(db: Database) {
  try {
    writeFileSync(dbPath, JSON.stringify(db, null, 2));
  } catch (error) {
    console.error('Database save error:', error);
  }
}

export class SimpleDBService {
  // User operations
  getUserByUsername(username: string) {
    const db = loadDB();
    return db.users.find(user => user.username === username) || null;
  }
  
  getUserById(id: number) {
    const db = loadDB();
    return db.users.find(user => user.id === id) || null;
  }
  
  getUsersByRole(role: string) {
    const db = loadDB();
    return db.users
      .filter(user => user.role === role)
      .map(user => ({
        id: user.id,
        nama: user.nama,
        username: user.username,
        role: user.role,
        created_at: user.created_at
      }));
  }
  
  createUser(nama: string, username: string, password: string, role: 'admin' | 'petugas_pkp' | 'ar') {
    const db = loadDB();
    
    // Check if username already exists
    if (db.users.find(user => user.username === username)) {
      throw new Error('Username sudah digunakan');
    }
    
    const newUser = {
      id: db.lastUserId + 1,
      nama,
      username,
      password: bcrypt.hashSync(password, 10),
      role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    db.users.push(newUser);
    db.lastUserId = newUser.id;
    saveDB(db);
    
    return { lastInsertRowid: newUser.id };
  }
  
  updateUser(id: number, data: any) {
    const db = loadDB();
    const userIndex = db.users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      throw new Error('User tidak ditemukan');
    }
    
    const user = db.users[userIndex];
    
    // Check username uniqueness if being changed
    if (data.username && data.username !== user.username) {
      if (db.users.find(u => u.username === data.username && u.id !== id)) {
        throw new Error('Username sudah digunakan');
      }
    }
    
    // Update fields
    if (data.nama) user.nama = data.nama;
    if (data.username) user.username = data.username;
    if (data.password) user.password = bcrypt.hashSync(data.password, 10);
    user.updated_at = new Date().toISOString();
    
    saveDB(db);
    return { changes: 1 };
  }
  
  deleteUser(id: number) {
    const db = loadDB();
    const userIndex = db.users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      throw new Error('User tidak ditemukan');
    }
    
    db.users.splice(userIndex, 1);
    saveDB(db);
    return { changes: 1 };
  }
  
  verifyPassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}

export const simpleDBService = new SimpleDBService();