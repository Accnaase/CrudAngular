import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';

export interface PeriodicElement {
  nome: string;
  qtd: number; 
}

const ELEMENT_DATA: PeriodicElement[] = [

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
      } : {
        nome: element.nome,
        qtd: element.qtd
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        if(this.dataSource.map(p => p.qtd).includes(result.position)) {
          this.dataSource[result.i] = result;
          this.table?.renderRows();
        }   else {
            this.dataSource.push(result);
            localStorage.setItem("dataSource", JSON.stringify(this.dataSource));
            this.table?.renderRows();
          }
      }
    });
  }

  openDialogEdit(element: PeriodicElement | null, index: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: element === null ? {
        nome: "",
        qtd: null
      } : {
        nome: element.nome,
        qtd: element.qtd
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        if(this.dataSource.map(p => p.qtd).includes(result.position)) {
          this.dataSource[result.i -1] = result;
          this.table?.renderRows();
        }   else {
            this.dataSource.splice(index, 1, result)
            this.table?.renderRows(); 
          }
      }
    });
  }

  ngOnInit(): void {
    let ds = localStorage.getItem("dataSource");
    if(ds !== null) {
      this.dataSource = JSON.parse(ds);
    }
  }

  deletarElemento(index: number):void {
      this.dataSource.splice(index, 1)
      this.table?.renderRows();    
      // localStorage.setItem("dataSource", JSON.stringify(this.dataSource));
      // Apagar permanentemente do localStorage
  }

  editarElemento(element: PeriodicElement, index: number):void {
    this.openDialogEdit(element, index); 
  }

}
