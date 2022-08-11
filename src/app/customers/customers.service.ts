import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer.model';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CustomersService {
  private customers: Customer[] = [];
  private customersUpdated = new Subject<Customer[]>();

  constructor(private http: HttpClient) {}

  getCustomers() {
    this.http
    .get<{message: string, customers: any}>('http://localhost:3000/api/customers')
    .pipe(map((customerData) => {
      return customerData.customers.map(customer => {
        return {
          id: customer._id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          gender: customer.gender
        }
      });
    }))
    .subscribe((transformCustomers) => {
      this.customers = transformCustomers;
      this.customersUpdated.next([...this.customers]);
    });
  }

  getCustomerUpdateListener() {
    return this.customersUpdated.asObservable();
  }

  getCustomer(id: string) {
    return this.http.get<{_id: string; name: string; email: string; phone: string; address: string; gender: string}>
    ('http://localhost:3000/api/customers/' + id);
  }

  addCustomer(name: string, email: string, phone: string, address: string, gender: string) {
    const customer: Customer = {
      id      : null,
      name    : name,
      email   : email,
      phone   : phone,
      address : address,
      gender  : gender
    };
    this.http.post<{message: string, customerId: string}>('http://localhost:3000/api/customers', customer)
    .subscribe((responseData) => {
      const custId = responseData.customerId;
      customer.id = custId;
      this.customers.push(customer);
      this.customersUpdated.next([...this.customers]);
    });
  }

  updateCustomer(id: string, name: string, email: string, phone: string, address: string, gender: string) {
    const customer: Customer = {
      id      : id,
      name    : name,
      email   : email,
      phone   : phone,
      address : address,
      gender  : gender
    }
    this.http.put('http://localhost:3000/api/customers/' + id, customer)
    .subscribe((response) => {
      const updatedCustomers = [...this.customers];
      const oldCustomerIndex = updatedCustomers.findIndex(c => c.id === customer.id);
      updatedCustomers[oldCustomerIndex] = customer;
      this.customers = updatedCustomers;
      this.customersUpdated.next([...this.customers]);
    });
  }

  deleteCustomer(customerId: string) {
    this.http.delete('http://localhost:3000/api/customers/' + customerId)
    .subscribe(() => {
      const updatedCustomers = this.customers.filter(customer => customer.id !== customerId);
      this.customersUpdated.next([...updatedCustomers]);
    });
  }
}
