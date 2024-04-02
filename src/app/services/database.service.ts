import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { User } from '../Model/User.data';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db!: SQLiteObject;
  dbConfig = {
    name: 'data.db',
    location: 'default'
  };

  loggedInUsername: string | null = null; // Property to store the username of the logged-in user

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
  ) {
    this.initializeDatabase();
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await this.platform.ready();
      this.db = await this.sqlite.create(this.dbConfig);
      await this.createTable();
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  private async createTable(): Promise<void> {
    const query = `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT,
      username TEXT UNIQUE,
      password TEXT,
      email TEXT,
      mobileNumber TEXT
    )`;
    try {
      console.log('Creating table');
      await this.db.executeSql(query, []);
      console.log('Table created successfully');
    } catch (error) {
      console.error('Error creating table:', error);
    }
  }

  async register(user: User): Promise<boolean> {
    try {
      await this.waitForDatabase();
      const query = `INSERT INTO users (fullName, username, password, email, mobileNumber) VALUES (?, ?, ?, ?, ?)`;
      await this.db.executeSql(query, [user.fullName, user.username, user.password, user.email, user.mobileNumber]);
      await Storage.set({
        key: 'loggedInUser',
        value: JSON.stringify(user) // Serialize the user object before storing it
      });
      return true; // Registration successful
    } catch (error) {
      console.error('Error registering user:', error);
      return false; // Registration failed
    }
  }

  async login(user: User): Promise<boolean> {
    try {
      await this.waitForDatabase();
      const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
      const result = await this.db.executeSql(query, [user.username, user.password]);
      const userFound = result.rows.length > 0;

      if (userFound) {
        await Storage.set({
          key: 'loggedInUser',
          value: JSON.stringify(user)
        });
        console.log('User logged in successfully');
      } else {
        console.log('User not found or invalid credentials');
      }
      return userFound;
    } catch (error) {
      console.error('Error logging in:', error);
      return false; // Login failed
    }
  }

  private async waitForDatabase(): Promise<void> {
    return new Promise<void>((resolve) => {
      const checkInitialized = () => {
        if (this.db) {
          resolve();
        } else {
          setTimeout(checkInitialized, 100);
        }
      };
      checkInitialized();
    });
  }
}
