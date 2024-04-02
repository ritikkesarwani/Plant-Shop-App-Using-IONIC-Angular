import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  updatedItem = {
    id: null,
    name: '',
    price: null,
    category: '',
    description: '',
    img: ''
  };

  constructor(
    private productsService: ProductsService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private apiService: ApiService

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const itemId = params['id'];
      if (itemId) {
        // Load existing item details for updating
        this.loadItemDetails(itemId);
      }
    });
  }

  async loadItemDetails(itemId: number) {
    try {
      const item = await this.productsService.getItemById(itemId);
      if (item) {
        this.updatedItem = item;
      } else {
        console.error('Item not found.');
      }
    } catch (error) {
      console.error('Error loading item details:', error);
    }
  }

  async updateItem() {
    try {
      await this.productsService.updateItem(this.updatedItem);
      console.log('Item updated successfully!');
      this.apiService.emitItemUpdated(); // Emit item update event
      this.navCtrl.back();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  }

  goBack() {
    // Navigate back to the previous page
    this.navCtrl.back();
  }
}
