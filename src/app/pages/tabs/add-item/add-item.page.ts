import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  newItem = {
    name: '',
    price: null,
    category: '',
    description: '',
    img: ''
  };

  constructor(private productsService: ProductsService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async addItem() {
    const success = await this.productsService.insertPlant(this.newItem);
    if (success) {
      console.log('Item added successfully!');
      // Reset the form after successful insertion
      this.clearForm();
    } else {
      console.error('Failed to add item to database!');
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

  isFormValid(): boolean {
    // Check if all mandatory fields are filled and not null
    return (
      this.newItem.name !== null &&
      this.newItem.price !== null &&
      this.newItem.category !== null &&
      this.newItem.description !== null &&
      this.newItem.img !== null
    );
  }
}
