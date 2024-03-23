import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  item: any;
  testId!: number;

  constructor(
    public navCtrl: NavController,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.testId = params['id']; // Access the 'id' parameter from the URL
      console.log('Test ID:', this.testId);
      this.item = this.apiService.getItem(this.testId);
    });
  }

}
