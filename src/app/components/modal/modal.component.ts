import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {

  precios = {
    sector1: 50000,
    sector2: 62000,
    sector3: 70000,
    vip: 100000,
  }
  cantidad: Record<string, number> = {
    sector1: 0,
    sector2: 0,
    sector3: 0,
    vip: 0,
  };

  total: number = 0;

  constructor(
    private modalCtrl: ModalController, 
    private toastController: ToastController,
    private router: Router
  ) { }

  // Calcular el precio total
  calculateTotal() {
    this.total = 
      this.cantidad[2] * this.precios.sector1 +
      this.cantidad[2] * this.precios.sector2 +
      this.cantidad[2] * this.precios.sector3 +
      this.cantidad[2] * this.precios.vip;
  }

  // Aumenta la cantidad de entradas
  increase(sector: string) {
    this.cantidad[sector]++;
    this.calculateTotal();
  }

  // Disminuye la cantidad de entradas
  decrease(sector: string) {
    if (this.cantidad[sector] > 0) {
      this.cantidad[sector]--;
      this.calculateTotal();
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.cantidad[1] !== 0) { 
      this.router.navigate(['/datos']);
      return this.modalCtrl.dismiss(this.generateMessage('a', 'success'), 'confirm');
    }else{
      return this.generateMessage('e', 'danger');
    }
  }

  async generateMessage(message: string, color: string){
    const toast = await this.toastController.create({
      /* mensage de error o exito en credenciales de inicio de sesion */
      message: message,
      duration: 3000 /* en milisegundos */,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }

  next(){
    if(this.cantidad[1] !== 0){
      this.router.navigate(['/datos']);
      return this.modalCtrl.dismiss(this.generateMessage('a', 'success'), 'confirm');
    }else{
      return this.generateMessage('Seleccione Entradas', 'danger');
    }
  }

  ngOnInit() {}

}
