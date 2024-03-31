import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  item: any;
  testId!: number;
  isInWishlist: boolean = false;

  constructor(
    public navCtrl: NavController,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private productsService: ProductsService
  ) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async params => {
      this.testId = params['id']; // Access the 'id' parameter from the URL
      console.log('Test ID:', this.testId);
      this.item = await this.productsService.getItemById(this.testId);
      this.isInWishlist = this.apiService.isInWishlist(this.item);
      console.log(this.item)
    });
  }

  addToWishlist(item: any): void {
    this.apiService.addToWishlist(item);
    this.isInWishlist = true;
  }

  removeFromWishlist(item: any): void {
    // Implement removal from wishlist if needed
    this.apiService.removeFromWishlist(item)
    this.isInWishlist = false;
  }

}
