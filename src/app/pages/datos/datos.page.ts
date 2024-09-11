import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {

  nombre!: string;
  apellido!: string;
  edad!: number;

  constructor(
    private toastController: ToastController, 
    private router: Router, 
  ) { }

  validateDatos(){
    if (this.nombre, this.apellido, this.edad) {
        this.generateMessage('Datos correctos', 'success');
        let extras: NavigationExtras = {
          state: {user: this.nombre}
        }
        this.router.navigate(['/home'], extras);
    }else{
      this.generateMessage('Ingrese datos', 'danger');
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

  ngOnInit() {
  }

}
