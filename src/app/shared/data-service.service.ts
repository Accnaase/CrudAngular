import { Injectable } from '@angular/core';
import { PeriodicElement } from '../tabela/tabela.component';

@Injectable({
  providedIn: 'root'
})
export class DataService{

  ELEMENT_DATA: PeriodicElement[] = [] 

  constructor() { }
}
