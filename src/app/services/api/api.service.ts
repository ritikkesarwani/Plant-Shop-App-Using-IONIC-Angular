import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  items: any[] = [
    // Your item data here
  ];

  private wishlist: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() { }

  getItem(id: any) {
    const item = this.items.find(x => x.id == id);
    return item;
  }

  private itemUpdatedSubject = new BehaviorSubject<void>(undefined);
  itemUpdated$ = this.itemUpdatedSubject.asObservable();

  emitItemUpdated() {
    this.itemUpdatedSubject.next();
  }
  
  addToWishlist(item: any): void {
    const currentWishlist = this.wishlist.getValue();
    const updatedWishlist = [...currentWishlist, item];
    this.wishlist.next(updatedWishlist);
  }

  removeFromWishlist(item: any): void {
    const currentWishlist = this.wishlist.getValue();
    const updatedWishlist = currentWishlist.filter(wishlistItem => wishlistItem.id !== item.id);
    this.wishlist.next(updatedWishlist);
  }

  getWishlist(): BehaviorSubject<any[]> {
    return this.wishlist;
  }

  isInWishlist(item: any): boolean {
    const currentWishlist = this.wishlist.getValue();
    return currentWishlist.some(wishlistItem => wishlistItem.id === item.id);
  }
}
