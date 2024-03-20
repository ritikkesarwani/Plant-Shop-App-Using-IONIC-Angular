import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  login(username: string, password: string): boolean {
    const storedUserData = localStorage.getItem(username);
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData.password === password) {
        return true;
      }
    }
    return false;
  }

  logout(): void {
    localStorage.clear();
  }

}
