import { Component, } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CustomersService } from "../customers.service";

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent {

  enteredName     = '';
  enteredEmail    = '';
  enteredPhone    = '';
  enteredAddress  = '';
  enteredGender   = '';

  constructor(public customersService: CustomersService) {}

  onAddCustomer(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.customersService.addCustomer(
      form.value.name,
      form.value.email,
      form.value.phone,
      form.value.address,
      form.value.gender
    );
    form.resetForm();
  }
}
