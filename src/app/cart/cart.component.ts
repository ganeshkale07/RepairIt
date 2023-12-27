import { Component, OnInit } from '@angular/core';
import { EMPTY, catchError, share, tap } from 'rxjs';
import Product from "src/interfaces/product";
import { ProductService } from 'src/service/product.service';
import { Store } from "@ngrx/store";
import { State } from "../state/app.state";
import * as productActions from "../state/app.actions";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems :Product[] | null = null;
  totalProductCost :number = 0;
  shippingAddress : string = "";

  constructor(private Store:Store<State>,private productService: ProductService) {}

  ngOnInit(): void {
    this.cartItems = this.productService.productAddedCartList;

    if(this.cartItems){
    this.totalProductCost = this.cartItems
      .map((item:Product) => item.qty * item.price)
      .reduce((initial:number, val:number) => initial + val);
    }
  }

  placeAnOrder(orderItem:Product[]){
    this.Store.dispatch(productActions.createNewOrder({ order : {orderId : uuidv4(),shippingAddress:this.shippingAddress, totalPrice: this.totalProductCost , orderedItem : orderItem}}));
    this.productService.selectedProductActionStream.next(null);
  }
  
}
