import { Component, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { RefresherEventDetail } from '@ionic/core';
import { InfiniteScrollCustomEvent, NavController, ToastController, IonToast, ActionSheetController, AlertController } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';
import { UserAuthService } from 'src/app/services/user-auth/user-auth.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { Storage } from '@capacitor/storage';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage {

  loggedInUser: any;
  selectedCategory = ''; // Variable to store the selected category
  popularItems: any[] = [];
  items: any[] = [];
  loadedItemsCount = 0;
  myInput = '';
  searchQuery = ''; // Variable to store the search query
  moreDataAvailable = true; // Flag to indicate if more data is available
  loading = false; // Variable to indicate data loading
  skeleton = false;
  loaderShown = true; // Flag to track whether the loader has been shown
  applyingFilter = false;
  sortOrder: 'asc' | 'desc' | 'all' = 'all'; // Variable to store the sorting order

  toastController = inject(ToastController);

  constructor(private apiService: ApiService,
    private authService: UserAuthService,
    private route: Router,
    private actionSheetCtrl: ActionSheetController,
    public alertController: AlertController,
    private navController: NavController,
    private productsService: ProductsService,
    private navCtrl: NavController
    ) {
  }

  ionViewWDidEnter() {
   
  }

  async ngOnInit(): Promise<void> {

    this.apiService.itemUpdated$.subscribe(() => {
      console.log('update item')
      this.refreshItemList();
    });

    console.log('hey')
    await this.loadLoggedInUser();

    if (this.loaderShown) {
      this.loading = true; // Show loader only if it hasn't been shown before
      this.skeleton = true;
    }
    

    this.addItems(8);

    Keyboard.addListener('keyboardWillShow', async (info) => {
      console.log('keyboard will show with height:', info.keyboardHeight);
      await this.presentToast('Keyboard Will Show ', 'top');
    });

    Keyboard.addListener('keyboardWillHide', async () => {
      await this.presentToast('Keyboard Will Hide ', 'top');
    });

  }

  refreshItemList() {
    // Logic to refresh item list
    // For example, fetch updated items from the service
    this.productsService.getItems().then(items => {
      this.popularItems = items;
    }).catch(error => {
      console.error('Error refreshing item list:', error);
    });
  }

  async deleteItem(itemId: number): Promise<boolean> {
    try {
      // Call your database service method to delete the item by ID
      const deleted = await this.productsService.deleteItem(itemId);
      this.refreshItemList();
      return deleted;
    } catch (error) {
      console.error('Error deleting item from database:', error);
      return false; // Return false if deletion fails
    }
  }

  addPlants(){
    console.log('hey')
    this.route.navigate(['/adding-item'])
  }

  async loadLoggedInUser() {
    console.log('homepage calling')
    try {
      console.log('enter in try block')
      const { value } = await Storage.get({ key: 'loggedInUser' });
      if (value) {
        console.log('enter in if')
        this.loggedInUser = JSON.parse(value); // Deserialize the stored user object
        console.log(this.loggedInUser)
      } else {
        console.log('User data not found in storage');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Logout!!',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Okay',
          handler: () => {
            this.logout();
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  // Method to present the action sheet for sorting options
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Sort Options',
      buttons: [
        {
          text: 'Low to High',
          handler: () => {
            this.sortLowToHigh();
          }
        },
        {
          text: 'High to Low',
          handler: () => {
            this.sortHighToLow();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await actionSheet.present();
  };

  // Method to sort items from low to high
  sortLowToHigh() {
    this.sortOrder = 'asc';
    // Logic to sort items from low to high
    this.popularItems.sort((a, b) => a.price - b.price);
  }

  // Method to sort items from high to low
  sortHighToLow() {
    this.sortOrder = 'desc';
    // Logic to sort items from high to low
    this.popularItems.sort((a, b) => b.price - a.price);
  }

  async showKeyboard() {
    await this.presentToastEvents('Tab Show Keyboard button.', 'top');
    const toast = await this.toastController.getTop();
    toast?.onDidDismiss().then(async () => {
      await Keyboard.show();
    });
   // this.applyFilter(); // Apply filter when showing keyboard
  }

  async presentToast(message: string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      color: 'success',
      message,
      duration: 1800,
      position
    });
    await toast.present();
  }

  async presentToastEvents(message: string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      color: 'medium',
      message,
      duration: 1500,
      position
    });
    await toast.present();
  }

  async addItems(count: number) {
    try {
      const items = await this.productsService.getItems(); // Fetch items from the service
      if (items && items.length > 0) {
        const newItems = items.slice(this.loadedItemsCount, this.loadedItemsCount + count);
        if (newItems.length === 0) {
          this.moreDataAvailable = false; // No more data available
        }
        this.popularItems.push(...newItems);
        this.loadedItemsCount += count;
        this.loading = false;
        this.skeleton = false; // Hide skeleton after fetching data
        this.loaderShown = false; // Set flag to true after loader is shown
        if (!this.applyingFilter) {
          this.applyingFilter = true;
         // this.applyCategoryFilter(); // Apply category filter after loading new items
         // this.applyFilter(); // Apply search filter after loading new items
          this.applyingFilter = false;
        }
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      // Handle error loading items
    }
  }


  async handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      this.addItems(4);
      event.detail.complete();
    }, 2000);
  }

  // applyFilter() {
  //   // Apply search filter
  //   const searchValue = this.searchQuery.trim().toLowerCase(); // Convert search query to lowercase for case-insensitive matching
  //   if (!searchValue || searchValue === '') {
  //     this.popularItems = items.slice(0, this.loadedItemsCount);
  //     this.applyCategoryFilter();
  //   } else {
  //     this.popularItems = items.filter(item =>
  //       item.name.toLowerCase().includes(searchValue) ||
  //       item.price.toString().includes(searchValue) ||
  //       item.category.toLowerCase().includes(searchValue)
  //     );
  //   }
  // };
  
  // applyCategoryFilter() {
  //   // Apply category filter
  //   const searchValue = this.searchQuery.trim().toLowerCase(); // Convert search query to lowercase for case-insensitive matching
  //   if (!this.selectedCategory || this.selectedCategory === 'all') {
  //     // If no category selected or 'All' selected, show all items based on search filter
  //     this.popularItems = items.slice(0, this.loadedItemsCount);

  //     this.popularItems = items.filter(item =>
  //       item.name.toLowerCase().includes(searchValue) ||
  //       item.price.toString().includes(searchValue) ||
  //       item.category.toLowerCase().includes(searchValue)
  //     );
  //   } else {
  //     // Filter items based only on the selected category
  //     this.popularItems = items.filter(item =>
  //       item.category.toLowerCase() === this.selectedCategory.toLowerCase()
  //     );
  //     // Apply search filter within the selected category
  //     this.popularItems = items.filter(item =>
  //       item.name.toLowerCase().includes(searchValue) ||
  //       item.price.toString().includes(searchValue) ||
  //       item.category.toLowerCase().includes(searchValue)
  //     );
  //   }
  // }

  logout(): void {
    this.authService.logout();
    this.route.navigate(['/home']);
  }

  addItem() {
    this.navCtrl.navigateForward(['/adding-item']); // Navigate to AddingItemPage for adding a new item
  }

  updateItem(itemId: number) {
    this.navCtrl.navigateForward(['/adding-item', itemId]); // Navigate to AddingItemPage with item ID for updating
  }


  onIonInfinite(ev: any) {
    this.addItems(8);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 3000);
  }
}
