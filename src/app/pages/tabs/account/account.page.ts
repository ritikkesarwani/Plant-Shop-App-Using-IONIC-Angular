import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  
  // user = {
  //   fullName: '',
  //   username: '',
  //   mobileNumber: '',
  //   email: ''
  // };

  loggedInUser: any;
  selectedImage: any;
  loading: boolean = true; // Initially set loading to true to show skeleton loading effect

  constructor() { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.loggedInUser = JSON.parse(storedUser);
    }

    // Simulate fetching user data from an API
    setTimeout(() => {
      // Set loading to false once data is fetched
      this.loading = false;
    }, 2000); // Simulate a 2-second delay for data fetching
  }

  checkPlatformForWeb() {
    if(Capacitor.getPlatform() == 'web') return true;
    return false;
  }

  
  async takePicture(){
    //await Camera.requestPermissions();
    const image = await Camera.getPhoto({
      quality: 50,
      //allowEditing: true,
      source: CameraSource.Prompt,
      width:600,
      resultType: this.checkPlatformForWeb()? CameraResultType.DataUrl : CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
   // var imageUrl = image.webPath;
  
    // Can be set to the src of an image now
    //imageElement.src = imageUrl;
    this.selectedImage = image;
    if(this.checkPlatformForWeb()) this.selectedImage.webPath = image.dataUrl;
  
  }


}
