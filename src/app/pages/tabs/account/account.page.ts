import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth/user-auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  
  currentUser: any;

  constructor() { }

  ngOnInit(): void {
  }

}
