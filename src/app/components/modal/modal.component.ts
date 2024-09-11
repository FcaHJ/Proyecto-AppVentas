import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { CalculoService } from 'src/app/api/calculo.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {

  nombre!: string;
  apellido!: string;
  edad!: number;

  total: number = 0;
  desc: number = 0;
  totalDesc: number = 0;

  showData: boolean = false;

  precios = this.calculoService.precios;
  cantidad: Record<string, number> = {
    sector1: 0,
    sector2: 0,
    sector3: 0,
    vip: 0,
  };

  constructor(
    private modalCtrl: ModalController, 
    private toastController: ToastController,
    private router: Router,
    public calculoService: CalculoService 
  ) { }

  calcularTotal() {
    const results = this.calculoService.calcularTotal(this.cantidad, this.edad);
    this.total = results.total;
    this.desc = results.desc;
    this.totalDesc = results.totalDesc;
  }
  // Aumenta la cantidad de entradas
  increase(sector: string) {
    this.cantidad[sector]++;
    this.calcularTotal();
  }

  // Disminuye la cantidad de entradas
  decrease(sector: string) {
    if (this.cantidad[sector] > 0) {
      this.cantidad[sector]--;
      this.calcularTotal();
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
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

  validateDatos(){
    if (this.nombre && this.apellido && this.edad) {
        this.generateMessage('Datos correctos', 'success');
      }else{
        this.generateMessage('Ingrese datos', 'danger');
      }
  } 

  next(){
    if (Object.values(this.cantidad).some(quantity => quantity > 0)) { 
      this.calcularTotal();
      this.showData = true;
    }else{
      this.generateMessage('Seleccione Entradas', 'danger');
    }
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.edad = navigation.extras.state['edad'];
  }
  }
}
