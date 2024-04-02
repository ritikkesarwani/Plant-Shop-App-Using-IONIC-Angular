import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from './api/api.service';


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
    private apiService: ApiService
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
      await this.db.executeSql(query, [item.name, item.price, item.category, item.description, item.img]); 4
      this.apiService.emitItemUpdated();

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

  async updateItem(item: any): Promise<boolean> {
    try {
      await this.waitForDatabase();
      const query = `UPDATE products SET name = ?, price = ?, category = ?, description = ?, img = ? WHERE id = ?`;
      await this.db.executeSql(query, [item.name, item.price, item.category, item.description, item.img, item.id]);

      return true; // Update successful
    } catch (error) {
      console.error('Error updating item:', error);
      return false; // Update failed
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

  async deleteItem(itemId: number): Promise<boolean> {
    try {
      // Execute a database query to delete the item by ID
      const query = `DELETE FROM products WHERE id = ?`;
      await this.db.executeSql(query, [itemId]);
      return true; // Return true if deletion is successful
    } catch (error) {
      console.error('Error deleting item:', error);
      return false; // Return false if deletion fails
    }
  }

  async filterData(filterBy: string = '', category: string = ''): Promise<any[]> {
    try {
      let query = `SELECT * FROM products`;  // Use the correct table name
      const params = [];  // Array to store query parameters

      // Build WHERE clause and filter parameters (if filterBy is provided)
      if (filterBy !== '') {
        query += ` WHERE (name LIKE ? OR price LIKE ?)`;
        params.push(`%${filterBy}%`, `%${filterBy}%`);
      }

      // Add category filter only if a specific category is selected
      if (category !== '' && category !== 'all') {
        if (filterBy !== '') {
          query += ` AND`;
        } else {
          query += ` WHERE`;
        }
        query += ` category = ?`;
        params.push(category);
        console.log(category, 'rr')
      }

      console.log(query, params);  // Log the final query and parameters for debugging

      console.log('Category:', category);
      console.log('Final SQL query:', query); // Log the final SQL query for debugging
      console.log('Query parameters:', params);
      const response = await this.db.executeSql(query, params);
      const data = this.extractResponse(response);
      console.log(data)
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  extractResponse(data: any) {
    let arr = [];
    if (data.rows.length === 0) {
      return [];
    }
    for (let i = 0; i < data.rows.length; i++) {
      arr.push(data.rows.item(i));
    }
    return arr;
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
