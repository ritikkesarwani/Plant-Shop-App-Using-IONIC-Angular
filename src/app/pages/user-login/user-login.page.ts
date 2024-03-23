// user-login.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth/user-auth.service';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User.data';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {
  loginForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private authService: UserAuthService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async login(): Promise<void> {
    if (this.loginForm.valid) {
      const user = this.loginForm.value as User;
      localStorage.setItem('UserData', JSON.stringify(user))

      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      const loggedIn = this.authService.login(username, password);

      if (loggedIn) {
        this.navCtrl.navigateForward(['/tabs']);
      } else {
        const toast = await this.toastController.create({
          message: 'Incorrect username or password',
          duration: 3000,
          color: 'danger'
        });
        await toast.present();
      }
    }
    else {
      console.log('Invalid form');
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
