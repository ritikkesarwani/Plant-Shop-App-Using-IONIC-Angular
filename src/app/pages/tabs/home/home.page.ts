import { Component, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { RefresherEventDetail } from '@ionic/core';
import { InfiniteScrollCustomEvent, NavController, ToastController, IonToast, ActionSheetController } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';
import { UserAuthService } from 'src/app/services/user-auth/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage {

  loggedInUser: any;
  selectedCategory: string = ''; // Variable to store the selected category
  popularItems: any[] = [];
  loadedItemsCount = 0;
  myInput = "";
  searchQuery: string = ""; // Variable to store the search query
  moreDataAvailable: boolean = true; // Flag to indicate if more data is available
  loading: boolean = false; // Variable to indicate data loading
  skeleton: boolean = false;
  loaderShown: boolean = true; // Flag to track whether the loader has been shown
  applyingFilter: boolean = false;
  sortOrder: 'asc' | 'desc' | 'all' = 'all'; // Variable to store the sorting order


  toastController = inject(ToastController);

  constructor(public apiService: ApiService,
    private authService: UserAuthService,
    private navCtrl: NavController,
    private route: Router,
    private actionSheetCtrl: ActionSheetController) {
  }

  ionViewWillEnter() {
    if (this.loaderShown) {
      this.loading = true; // Show loader only if it hasn't been shown before
      this.skeleton = true;
    }
    this.addItems(8);
  }

  ngOnInit(): void {
    Keyboard.addListener('keyboardWillShow', async (info) => {
      console.log('keyboard will show with height:', info.keyboardHeight);
      await this.presentToast('Keyboard Will Show ', 'top');
    });

    Keyboard.addListener('keyboardWillHide', async () => {
      await this.presentToast('Keyboard Will Hide ', 'top');
    });

    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.loggedInUser = JSON.parse(storedUser);
    }
  }

  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Yes',
      cssClass: 'alert-button-confirm',
      handler: ()=>{
        console.log("hey");
        this.logout();
      }
    },
  ];


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
    this.applyFilter(); // Apply filter when showing keyboard
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
    if (!this.moreDataAvailable) return; // Stop adding items if no more data available
    setTimeout(() => {
      const newItems = this.apiService.items.slice(this.loadedItemsCount, this.loadedItemsCount + count);
      if (newItems.length === 0) {
        this.moreDataAvailable = false; // No more data available
      }
      this.popularItems.push(...newItems);
      this.loadedItemsCount += count;
      this.loading = false;
      this.skeleton = false; // Hide skelton after fetching data
      this.loaderShown = false; // Set flag to true after loader is shown
      if (!this.applyingFilter) {
        this.applyingFilter = true;
        this.applyCategoryFilter(); // Apply category filter after loading new items
        this.applyFilter(); // Apply search filter after loading new items
        this.applyingFilter = false;
      }
    }, 2000);
  }

  async handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      this.addItems(4);
      event.detail.complete();
    }, 2000);
  }

  applyFilter() {
    // Apply search filter
    const searchValue = this.searchQuery.trim().toLowerCase(); // Convert search query to lowercase for case-insensitive matching
    if (!searchValue || searchValue === '') {
      this.popularItems = this.apiService.items.slice(0, this.loadedItemsCount);
      this.applyCategoryFilter();
    } else {
      this.popularItems = this.apiService.items.filter(item =>
        item.name.toLowerCase().includes(searchValue) ||
        item.price.toString().includes(searchValue) ||
        item.category.toLowerCase().includes(searchValue)
      );
    }
  };
  applyCategoryFilter() {
    // Apply category filter
    const searchValue = this.searchQuery.trim().toLowerCase(); // Convert search query to lowercase for case-insensitive matching
    if (!this.selectedCategory || this.selectedCategory === 'all') {
      // If no category selected or 'All' selected, show all items based on search filter
      this.popularItems = this.apiService.items.slice(0, this.loadedItemsCount);

      this.popularItems = this.popularItems.filter(item =>
        item.name.toLowerCase().includes(searchValue) ||
        item.price.toString().includes(searchValue) ||
        item.category.toLowerCase().includes(searchValue)
      );
    } else {
      // Filter items based only on the selected category
      this.popularItems = this.apiService.items.filter(item =>
        item.category.toLowerCase() === this.selectedCategory.toLowerCase()
      );
      // Apply search filter within the selected category
      this.popularItems = this.popularItems.filter(item =>
        item.name.toLowerCase().includes(searchValue) ||
        item.price.toString().includes(searchValue) ||
        item.category.toLowerCase().includes(searchValue)
      );
    }
  }

  logout(): void {
    this.authService.logout();
    this.route.navigate(['/home']);
  }

  onIonInfinite(ev: any) {
    this.addItems(8);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 3000);
  }
}
