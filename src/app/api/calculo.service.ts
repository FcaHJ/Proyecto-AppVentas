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

  total: number = 0;
  desc: number = 0;
  totalDesc: number = 0;
  edad: number = 0;

  constructor() { }

  calcularTotal(cantidad: Record<string, number>, edad: number):{total: number, desc: number, totalDesc: number } {
    let total = 0;
    let desc = 0;
    let totalDesc = 0;

    this.total = 
      cantidad['sector1'] * this.precios.sector1 +
      cantidad['sector2'] * this.precios.sector2 +
      cantidad['sector3'] * this.precios.sector3 +
      cantidad['vip'] * this.precios.vip;

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
    return {total,desc,totalDesc};
  }
}

