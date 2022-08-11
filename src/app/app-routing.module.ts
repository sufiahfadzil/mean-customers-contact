import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CustomerCreateComponent } from "./customers/customer-create/customer-create.component";
import { CustomerListComponent } from "./customers/customer-list/customer-list.component";

const routes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: 'create', component: CustomerCreateComponent },
  { path: 'edit/:customerId', component: CustomerCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
