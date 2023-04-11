import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from './list/list.component';
import {CreateinvoiceComponent} from './createinvoice/createinvoice.component';
import { RatingComponent } from './rating/rating.component';
const routes: Routes = [
  {component:ListComponent,path:""},
  {component:CreateinvoiceComponent,path:"createinvoice"},
  {component:CreateinvoiceComponent,path:"createinvoice"}, 
  {component:CreateinvoiceComponent,path:"editinvoice/:invoiceno"}  ,
  {component:RatingComponent,path:"rating"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
