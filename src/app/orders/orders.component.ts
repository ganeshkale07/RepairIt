import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { State } from "../state/app.state";
import { getAllOrders } from "../state/app.reducer";
import { Observable, of, tap } from "rxjs";
import { order } from "src/interfaces/order.interface";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders$ : Observable<order[] | null> = of(null);

  constructor(private Store:Store<State>){}

  ngOnInit(): void {
    this.orders$ = this.Store.select(getAllOrders).pipe(tap((ele) => console.log(ele)));

  }

}
