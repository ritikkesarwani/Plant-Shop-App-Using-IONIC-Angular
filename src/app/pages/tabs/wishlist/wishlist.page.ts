import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {}

  wishlist = this.apiService.getWishlist();

}
