import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMateriaisComponent } from './lista-materiais/lista-materiais.component';

import { TabelaComponent } from './tabela/tabela.component';

const routes: Routes = [
  { path: '', component: TabelaComponent },
  { path: 'lista', component: ListaMateriaisComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
