import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';

export interface PeriodicElement {
  nome: string;
  qtd: number;  
}

const ELEMENT_DATA: PeriodicElement[] = [
  { nome: 'Hydrogen', qtd: 1.0079 },
  { nome: 'Helium', qtd: 4.0026 },
  { nome: 'Lithium', qtd: 6.941 },
  { nome: 'Beryllium', qtd: 9.0122 },
  { nome: 'Boron', qtd: 10.811 },
  { nome: 'Carbon', qtd: 12.0107 },
  { nome: 'Nitrogen', qtd: 14.0067 },
  { nome: 'Oxygen', qtd: 15.9994 },
  { nome: 'Fluorine', qtd: 18.9984 },
  { nome: 'Neon', qtd: 20.1797 } 
];

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  @ViewChild(MatTable)
  table: MatTable<any> | undefined;

  displayedColumns: string[] = ['nome', 'qtd', 'actions'];
  dataSource = ELEMENT_DATA;
   
  constructor(public dialog: MatDialog) { }

  openDialog(element: PeriodicElement | null): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: element === null ? {
        nome: "",
        qtd: null
      } : element
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.dataSource.push(result);
        this.table?.renderRows();
      }
    });
  }

  ngOnInit(): void {
  }

}
