import { Component, OnInit, } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Customer } from "../customer.model";
import { CustomersService } from "../customers.service";

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  enteredName     = '';
  enteredEmail    = '';
  enteredPhone    = '';
  enteredAddress  = '';
  enteredGender   = '';
  private mode    = 'create';
  private customerId: string;
  public customer: Customer;

  constructor(public customersService: CustomersService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('customerId')) {
        this.mode = 'edit';
        this.customerId = paramMap.get('customerId');
        this.customersService.getCustomer(this.customerId).subscribe(customerData => {
          this.customer = {
            id: customerData._id,
            name: customerData.name,
            email: customerData.email,
            phone: customerData.phone,
            address: customerData.address,
            gender: customerData.gender
          };
        });
      } else {
        this.mode = 'create';
        this.customerId = null;
      }
    });
  }

  onSaveCustomer(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.customersService.addCustomer(
        form.value.name,
        form.value.email,
        form.value.phone,
        form.value.address,
        form.value.gender
      );
    } else {
      this.customersService.updateCustomer(
        this.customerId,
        form.value.name,
        form.value.email,
        form.value.phone,
        form.value.address,
        form.value.gender
      );
    }
    form.resetForm();
  }
}
