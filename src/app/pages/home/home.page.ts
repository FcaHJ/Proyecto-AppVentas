import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modal/modal.component';

import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('2.5s ease-in-out')
      ]),
    ]),
  ]
})
export class HomePage implements OnInit {
  
  constructor(private modalCtrl: ModalController) { 
  }

  ngOnInit(){
    }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
    });
    await modal.present();
  
    const { data, role } = await modal.onWillDismiss();
  }
}
