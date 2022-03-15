import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { filter } from 'rxjs';
import { DataService } from '../shared/data-service.service';

@Component({
  selector: 'app-lista-materiais',
  templateUrl: './lista-materiais.component.html',
  styleUrls: ['./lista-materiais.component.css']
})
export class ListaMateriaisComponent implements OnInit {
  @ViewChild(MatTable)
  table: MatTable<any> | undefined;
  total: number = 0;
  totalComprados: number = 0;

  totalPercento: number | undefined;
  totalMarcados: number | undefined;


  displayedColumns: string[] = ['checkbox', 'nome', 'qtd', 'preco', 'total'];

  constructor(public dataSource: DataService) { }

  calcularComprados(): number {
    this.totalComprados = 0;
    this.dataSource.ELEMENT_DATA.forEach(element => {
      if (element.checkbox) {
        element.total = element.preco * element.qtd || 0
        this.totalComprados = this.totalComprados + element.total
      }
    });
    return this.totalComprados
  }

  calcular(): number {
    this.total = 0;
    this.dataSource.ELEMENT_DATA.forEach(element => {
      element.total = element.preco * element.qtd || 0
      this.total = this.total + element.total
    });
    return this.total 
  }

  calculaBarra(): number {
    this.totalPercento = this.dataSource.ELEMENT_DATA.length
    this.totalMarcados = this.dataSource.ELEMENT_DATA.filter(element => {
      return element.checkbox
    }).length
    return ((this.totalMarcados / this.totalPercento) * 100)
  }

  ngOnInit(): void {
    let ds = localStorage.getItem("dataSource");
    if (ds !== null) {
      this.dataSource.ELEMENT_DATA = JSON.parse(ds);
    }
  }

}
