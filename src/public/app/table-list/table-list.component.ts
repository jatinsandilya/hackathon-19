import { Component, OnInit } from '@angular/core';

import { DataService } from '../common/data.service';
import { ICustomerResponse,ICustomer } from '../shared/interfaces';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  customers: ICustomer;

  constructor( private dataService: DataService ) { }

  ngOnInit() {
    this.getInitializeFlights();
  }

  getInitializeFlights(): any {
        this.dataService.getCustomer("5c7d4736687cbd72e6a25b8b")
        .subscribe((response: ICustomer) => {
          this.customers = response;
        },
        (err: any) => console.log(err),
        () => console.log('getCustomer("5c7d4736687cbd72e6a25b8b") retrieved customers'));
  }

}
