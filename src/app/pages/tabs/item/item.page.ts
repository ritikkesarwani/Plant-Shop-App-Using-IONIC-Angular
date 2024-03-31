import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  item: any;
  testId!: number;

  constructor(
    public navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private wishlistService: ApiService,
    private productsService: ProductsService
  ) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async params => {
      this.testId = params['id']; // Access the 'id' parameter from the URL
      console.log('Test ID:', this.testId);
      this.item = await this.productsService.getItemById(this.testId);
      console.log(this.item)
    });
  }


  addToWishlist(item: any): void {
    this.wishlistService.addToWishlist(item);
  }

  // goBack(){
  //   console.log("clicked go back")
  //   this.navCtrl.navigateBack(['tabs/home'])
  // }

}
