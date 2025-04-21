import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-atu',
  templateUrl: './atu.page.html',
  styleUrls: ['./atu.page.scss'],
  standalone: true,
  imports: [IonImg, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AtuPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
