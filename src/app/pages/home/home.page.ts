import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController, private router: Router) { }

  loginPage() {
    this.navCtrl.navigateForward(['/user-login']);
  }

  signUpPage() {
    this.navCtrl.navigateForward(['/user-sign-up']);
  }

}
