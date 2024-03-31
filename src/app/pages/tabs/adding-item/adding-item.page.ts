import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  isUpdateMode = false; // Flag to indicate whether it's in update mode
  itemId!: number; // Variable to store the item ID for updating

  constructor(
    private productsService: ProductsService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Check if an item ID is provided in the route parameters
    this.route.params.subscribe(params => {
      this.itemId = params['id']; // Get the item ID from the route parameters
      if (this.itemId) {
        // It's in update mode if an item ID is provided
        this.isUpdateMode = true;
        // Load the existing item details for updating
        this.loadItemDetails();
      }
    });
  }

  async loadItemDetails() {
    try {
      const item = await this.productsService.getItemById(this.itemId);
      if (item) {
        // Populate newItem with the fetched item details
        this.newItem = {
          name: item.name,
          price: item.price,
          category: item.category,
          description: item.description,
          img: item.img
        };
      } else {
        console.error('Item not found.');
      }
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  }

  async addItemOrUpdate() {
    try {
      if (this.isUpdateMode) {
        await this.productsService.updateItem(this.newItem);
        console.log('Item updated successfully!');
      } else {
        await this.productsService.insertPlant(this.newItem);
        console.log('Item added successfully!');
      }
      // Reset the form after successful insertion or update
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
