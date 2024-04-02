import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-adding-item',
  templateUrl: './adding-item.page.html',
  styleUrls: ['./adding-item.page.scss'],
})
export class AddingItemPage implements OnInit {

  newItem = {
    name: '',
    price: null,
    category: '',
    description: '',
    img: ''
  };

  constructor(
    private productsService: ProductsService,
    private navCtrl: NavController
  ) { }

  ngOnInit() { }

  async addItem() {
    try {
      const item = await this.productsService.insertPlant(this.newItem);
      console.log('Item added successfully!');
      this.clearForm();
      this.navCtrl.back();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  clearForm() {
    this.newItem = {
      name: '',
      price: null,
      category: '',
      description: '',
      img: ''
    };
  }

  goBack() {
    this.navCtrl.back();
  }
}
