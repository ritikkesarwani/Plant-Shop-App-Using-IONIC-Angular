import { Component, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { RefresherEventDetail } from '@ionic/core';
import { InfiniteScrollCustomEvent, NavController, ToastController, IonToast } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  popularItems: any[] = [];
  loadedItemsCount = 0;
  myInput = "";
  searchQuery: string = ""; // Variable to store the search query
  moreDataAvailable: boolean = true; // Flag to indicate if more data is available
  loading: boolean = false; // Variable to indicate data loading
  loaderShown: boolean = true; // Flag to track whether the loader has been shown

  toastController = inject(ToastController);

  constructor(public apiService: ApiService,
    private navCtrl: NavController) {
  }

  ionViewWillEnter() {
    if (this.loaderShown) {
      this.loading = true; // Show loader only if it hasn't been shown before
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
      this.loading = false; // Hide loader after fetching data
      this.loaderShown = false; // Set flag to true after loader is shown
      this.applyFilter(); // Apply filter after loading new items
    }, 2000);
  }

  async handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      this.addItems(4);
      event.detail.complete();
    }, 2000);
  }

  applyFilter() {
    const searchValue = this.searchQuery.trim().toLowerCase();
    if (!searchValue || searchValue === '') {
      this.popularItems = this.apiService.items.slice(0, this.loadedItemsCount);
    } else {
      this.popularItems = this.apiService.items
        .filter(item =>
          item.name.toLowerCase().includes(searchValue) || item.price.toString().includes(searchValue) || item.category.toLowerCase().toString().includes(searchValue))
        .slice(0, this.loadedItemsCount);
    }
  }

  onIonInfinite(ev: any) {
    this.addItems(8);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 3000);
  }
}
