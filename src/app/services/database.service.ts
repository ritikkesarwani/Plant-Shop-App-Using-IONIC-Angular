import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { User } from '../Model/User.data';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db!: SQLiteObject;
  dbConfig = {
    name: 'data.db',
    location: 'default'
  }
  platformReady = false;

  constructor(
    private sqlite: SQLite, 
    private platform: Platform
    ){ 
    this.platform.ready().then(() => {
      this.sqlite.echoTest()
      this.sqlite.create(this.dbConfig).then((db: SQLiteObject) => {
        this.db = db;
        this.createTable();
      }).catch(error => console.error(error))
    });
  }

  // createDatabase() {
  //   if (!this.platformReady) {
  //     console.error('Platform is not ready');
  //     return;
  //   }
  //   this.sqlite.create(this.dbConfig)
  //     .then((db: SQLiteObject) => {
  //       this.db = db;
  //       console.log('Database Connected');
        
  //     })
  //     .catch(error => console.error('Error creating database:', error));
  // }

  createTable() {
    if (!this.db) {
      console.error('Database is not initialized');
      return;
    }
    const query = `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT,
      username TEXT UNIQUE,
      password TEXT,
      email TEXT,
      mobileNumber TEXT
    )`;
    console.log('Creating table');
    this.db.executeSql(query, [])
      .then(() => console.log('Table created successfully'))
      .catch(error => console.error('Error creating table:', error));
  }

  async register(user: User): Promise<boolean> {
    await this.waitForDatabase();
    if (!this.db) {
      console.error('Database is not initialized');
      return false;
    }
    const query = `INSERT INTO users (fullName, username, password, email, mobileNumber) VALUES (?, ?, ?, ?, ?)`;
    try {
      await this.db.executeSql(query, [user.fullName, user.username, user.password, user.email, user.mobileNumber]);
      return true; // Registration successful
    } catch (error) {
      console.error('Error registering user:', error);
      return false; // Registration failed
    }
  }

  async login(user: User): Promise<boolean> {
    await this.waitForDatabase();
    if (!this.db) {
      console.error('Database is not initialized');
      return false;
    }
    const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
    try {
      const result = await this.db.executeSql(query, [user.username, user.password]);
      return result.rows.length > 0; // User found in database
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
