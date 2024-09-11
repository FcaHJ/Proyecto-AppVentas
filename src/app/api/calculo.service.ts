import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculoService {

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
  desc: number = 0;
  totalDesc: number = 0;
  edad: number = 0;

  constructor() { }

  setEdad(edad: number){
    this.edad = edad
  }

  setCantidad(cantidad: Record<string,number>){
    this.cantidad = cantidad
  }

  calcularTotal() {
    this.total = 
      this.cantidad[2] * this.precios.sector1 +
      this.cantidad[2] * this.precios.sector2 +
      this.cantidad[2] * this.precios.sector3 +
      this.cantidad[2] * this.precios.vip;
    // Aplicar descuento si la edad es menor que 18 o mayor que 60
    if (this.edad < 18) {
      this.desc = this.total * 0.1;
      this.totalDesc = this.total - this.desc;
    } else if(this.edad >= 60){
      this.desc = this.total * 0.2;
      this.totalDesc = this.total - this.desc;
    } else {
      this.desc = 0;
      this.totalDesc = this.total;
    }
  }

    // Obtener el total
    getTotal() {
      return this.total;
    }

    // Obtener el descuento
    getDescuento() {
      return this.desc;
    }

    // Obtener el total con descuento
    getTotalDescuento() {
      return this.totalDesc;
    }
}

