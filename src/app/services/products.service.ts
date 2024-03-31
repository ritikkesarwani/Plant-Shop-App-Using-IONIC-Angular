import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private db!: SQLiteObject;

  private readonly dbConfig = {
    name: 'products.db',
    location: 'default'
  };

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
    const query = `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price INTEGER,
      category TEXT,
      description TEXT,
      img TEXT
    )`;
    try {
      console.log('Creating table');
      await this.db.executeSql(query, []);
      console.log('Table created successfully');
    } catch (error) {
      console.error('Error creating table:', error);
    }
  }

  async insertPlant(item: any): Promise<boolean> {
    try {
      await this.waitForDatabase();
      const query = `INSERT INTO products (name, price, category, description, img) VALUES (?, ?, ?, ?, ?)`;
      await this.db.executeSql(query, [item.name, item.price, item.category, item.description, item.img]);
      return true; // Insertion successful
    } catch (error) {
      console.error('Error inserting plant:', error);
      return false; // Insertion failed
    }
  }

  async getItems(): Promise<any[]> {
    try {
      await this.waitForDatabase();
      const query = `SELECT * FROM products`;
      const result = await this.db.executeSql(query, []);
      if (result.rows.length > 0) {
        const items = [];
        for (let i = 0; i < result.rows.length; i++) {
          items.push(result.rows.item(i));
        }
        return items;
      } else {
        return []; // No items found
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      return []; // Error occurred while fetching items
    }
  }

  async getItemById(id: number): Promise<any | null> {
    try {
      await this.waitForDatabase();
      const query = `SELECT * FROM products WHERE id = ?`;
      const result = await this.db.executeSql(query, [id]);
      if (result.rows.length > 0) {
        console.log(result.rows.item(0))
        return result.rows.item(0); // Return the first item with the provided ID
      } else {
        return null; // No item found with the provided ID
      }
    } catch (error) {
      console.error('Error fetching item by ID:', error);
      return null; // Error occurred while fetching item by ID
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
