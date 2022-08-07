import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Customer } from './customer.model';

@Injectable({providedIn: 'root'})
export class CustomersService {
  private customers: Customer[] = [];
  private customersUpdated = new Subject<Customer[]>();

  getCustomers() {
    return [...this.customers];
  }

  getCustomerUpdateListener() {
    return this.customersUpdated.asObservable();
  }

  addCustomer(name: string, email: string, phone: string, address: string, gender: string) {
    const customer: Customer = {
      name    : name,
      email   : email,
      phone   : phone,
      address : address,
      gender  : gender
    };
    this.customers.push(customer);
    this.customersUpdated.next([...this.customers]);
  }
}
