import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  loggedInUser: any;
  selectedImage: any;
  loading: boolean = true; // Initially set loading to true to show skeleton loading effect

  constructor() { }
  
  async ngOnInit(): Promise<void> {
    await this.loadLoggedInUser();

    // Simulate fetching user data from storage
    setTimeout(() => {
      // Set loading to false once data is fetched
      this.loading = false;
    }, 2000); // Simulate a 2-second delay for data fetching
  }

  async loadLoggedInUser() {
    try {
      const { value } = await Storage.get({ key: 'loggedInUser' });
      if (value) {
        this.loggedInUser = JSON.parse(value); // Deserialize the stored user object
      } else {
        console.log('User data not found in storage');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  }

  // Check if platform is web
  checkPlatformForWeb(): boolean {
    return Capacitor.getPlatform() === 'web';
  }
  
  async takePicture(){
    // Get picture from camera
    const image = await Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      width: 600,
      resultType: this.checkPlatformForWeb() ? CameraResultType.DataUrl : CameraResultType.Uri
    });
  
    // Set selected image
    this.selectedImage = image;
    
    // For web platform, set web path
    if (this.checkPlatformForWeb()) {
      this.selectedImage.webPath = image.dataUrl;
    }
  }
}
