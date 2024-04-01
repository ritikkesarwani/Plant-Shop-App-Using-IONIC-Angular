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

  ngOnInit() {}

  async addItem() {
    try {
      await this.productsService.insertPlant(this.newItem);
      console.log('Item added successfully!');
      // Reset the form after successful insertion
      this.clearForm();
      // Navigate back to the previous page
      this.navCtrl.back();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  clearForm() {
    // Reset the newItem object to clear the form fields
    this.newItem = {
      name: '',
      price: null,
      category: '',
      description: '',
      img: ''
    };
  }

  goBack() {
    // Navigate back to the previous page
    this.navCtrl.back();
  }
}
