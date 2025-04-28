import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import  {Storage} from '@ionic/storage-angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RatingComponent } from '../rating/rating.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonImg, IonHeader, IonToolbar, IonTitle, IonContent,RouterLink,RatingComponent,CommonModule,RouterModule],
})
export class HomePage {
  title = "ATU Task Manager";
  constructor(private storage: Storage) {}
}
