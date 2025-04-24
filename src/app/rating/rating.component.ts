import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton,} from "@ionic/angular/standalone";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  imports: [IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonButton]
})
export class RatingComponent  implements OnInit {
  like = 0; // holds number of likes
   dislike = 0; // holds number of dislikes

  constructor(private storage:Storage,) { } //injectiing ionic storage

  async ngOnInit() {
// initialse storage
  await this.storage.create();

// saved value from storage. fall back to 0 if null
  this.like = (await this.storage.get('like')) || 0;
  this.dislike = (await this.storage.get('dislike')) || 0;
}

// called when like button is called
  async likeClicked() {
    this.like++ // increases likes and save to storage
    await this.storage.set('like',this.like);
  }

// called when dislike button is called
  async dislikeClicked(){
    this.dislike++ // increases dislikes and save to storage
    await this.storage.set('dislike',this.dislike);
  }

  

}
