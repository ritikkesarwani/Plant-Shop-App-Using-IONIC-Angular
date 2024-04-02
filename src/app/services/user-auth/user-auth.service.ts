import { Injectable } from '@angular/core';
import { DatabaseService } from '../database.service';
import { User } from 'src/app/Model/User.data';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private databaseService: DatabaseService) { }

  async register(user: User): Promise<boolean> {
    console.log("userauth serivce called", user)
    return this.databaseService.register(user);
  }

  async login(user: User): Promise<boolean> {
    return this.databaseService.login(user);
  }
  
  logout(): void {
    localStorage.removeItem('loggedInUser');
  }

}
