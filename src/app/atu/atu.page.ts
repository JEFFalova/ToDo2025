import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonImg, IonButton } from '@ionic/angular/standalone';
import {Browser} from '@capacitor/browser'

@Component({
  selector: 'app-atu',
  templateUrl: './atu.page.html',
  styleUrls: ['./atu.page.scss'],
  standalone: true,
  imports: [IonButton, IonImg, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AtuPage implements OnInit {
  OpenBrowser() {
    Browser.open({url: 'https://www.atu.ie/'})
  }

  constructor() { }

  ngOnInit() {
  }

}
