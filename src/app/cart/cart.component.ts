import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, catchError, from, map, of, share, tap } from 'rxjs';
import Product from "src/interfaces/product";
import { ProductService } from 'src/service/product.service';
import { Store } from "@ngrx/store";
import { State } from "../state/app.state";
import * as productActions from "../state/app.actions";
import { v4 as uuidv4 } from 'uuid';
import { getCartItem } from "../state/app.reducer";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems$ :Observable<Product[] | null> = of(null);
  cartProducts :Product[] | null = null;
  totalProductCost : number = 0;
  shippingAddress : string = "";

  constructor(private Store:Store<State>,private productService: ProductService) {}

  ngOnInit(): void {
    // this.cartItems$ = this.productService.cartList$.pipe(
    //   tap((product) => {
    //     console.log('Added Product', product);
    //   })
    // );

    // if(this.cartItems$){
    //   this.totalProductCost = from(this.cartItems$).pipe(
    //     tap((product) => {
    //       console.log('Added Product', product);
    //     }))
    // }

    this.cartItems$ = this.Store.select(getCartItem).pipe(
      tap((cartItems) => {
        if(cartItems !== null){
          this.totalProductCost = cartItems
          .map((item:Product) => item.qty * item.price)
          .reduce((initial:number, val:number) => initial + val);
        }
      })      
    )

  }

  placeAnOrder(orderItem:Product[]){
    this.Store.dispatch(productActions.createNewOrder({ order : {orderId : uuidv4(),shippingAddress:this.shippingAddress, totalPrice: 2 , orderedItem : orderItem}}));
    this.productService.selectedProductActionStream.next({id : null,flag : false});
  }
  
  onIncreaseQty(passedId : number , passedFlag : boolean){
    this.productService.emitSelectedProductIntoStream({passedId,passedFlag});
  }

  onDecreaseQty(passedId : number , passedFlag : boolean){
    this.productService.emitSelectedProductIntoStream({passedId,passedFlag});

  }
}

