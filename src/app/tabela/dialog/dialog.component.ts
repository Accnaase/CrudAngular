import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from 'src/app/tabela/tabela.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  element!: PeriodicElement;
  dialogEdit!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: PeriodicElement,
    public dialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void {
      this.dialogEdit = this.data.nome == "";
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
