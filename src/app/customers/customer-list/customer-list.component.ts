import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Customer } from '../customer.model';
import { CustomersService } from "../customers.service";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  customers: Customer[] = [];
  private customersSub: Subscription;

  constructor(public customersService: CustomersService) {}

  ngOnInit(): void {
    this.customers    = this.customersService.getCustomers();
    this.customersSub = this.customersService.getCustomerUpdateListener()
    .subscribe((customers: Customer[]) => {
      this.customers = customers;
    });
  }

  ngOnDestroy(): void {
    this.customersSub.unsubscribe();
  }
}
