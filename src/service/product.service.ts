import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import product from 'src/interfaces/product';
import { Subject, catchError, combineLatest, map, of, tap } from 'rxjs';
import productData from '../mockData/productDataAPI';
import * as productActions from '../app/state/app.actions';
import { Store } from "@ngrx/store";
import { State } from "src/app/state/app.state";
import { getCartItem } from "src/app/state/app.reducer";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productData = productData;

  productAddedCartList: product[] | null = null;

  constructor(private http: HttpClient, private Store : Store<State>) {
    //Get Cart Item
    this.Store.select(getCartItem).subscribe((cartItem) => this.productAddedCartList = cartItem);

  }

  //To get all product
  allProducts$ = of(this.productData);

  //create an action strem
  //when user clicked on ADD button
  selectedProductActionStream = new Subject<{id : number | null , flag : boolean}>();
  selectedProductActionStream$ = this.selectedProductActionStream.asObservable();

  emitSelectedProductIntoStream({passedId , passedFlag}:{passedId : number | null  , passedFlag : boolean} ) {
    this.selectedProductActionStream.next({id : passedId,flag : passedFlag});
  }

  //push data into cart
  // cartList$ = combineLatest([
  //   this.allProducts$,
  //   this.selectedProductActionStream$,
  // ]).pipe(
  //   tap((ele) => console.log('selectedPro', ele)),
  //   map(([products, id]) => {
  //     let matchProduct = products.find((p) => p.id == id);
  //     if(id ===  null){
  //       this.productAddedCartList = null;
  //       return this.productAddedCartList;
  //     }else{
  //       //If already added in cart
  //     if (
  //       this.productAddedCartList &&
  //       this.productAddedCartList.find((p) => p.id == id)
  //     ) {
  //       return this.productAddedCartList.map((p) =>
  //         p.id == id ? { ...p, qty: p.qty + 1 } : { ...p }
  //       );
  //     }
  //     //If not present in cart
  //     else {
  //       //if cart is EMPTY initially
  //       if (!this.productAddedCartList) {
  //         this.productAddedCartList = [];
  //         this.productAddedCartList.push(
  //           matchProduct
  //             ? matchProduct
  //             : {
  //                 id: 11,
  //                 name: 'Dummy',
  //                 inventedBy: 'Dummy',
  //                 imageLink: 'Url',
  //                 price: 123,
  //                 currency: 'Rs',
  //                 qty: 1,
  //               }
  //         );
  //         return this.productAddedCartList;
  //       } else {
  //         return [
  //           ...this.productAddedCartList,
  //           matchProduct
  //             ? matchProduct
  //             : {
  //                 id: 11,
  //                 name: 'Dummy',
  //                 inventedBy: 'Dummy',
  //                 imageLink: 'Url',
  //                 price: 123,
  //                 currency: 'Rs',
  //                 qty: 1,
  //               },
  //         ];
  //       }
  //     }
  //     }
  //   })
  // );

  cartList$ = combineLatest([
    this.allProducts$,
    this.selectedProductActionStream$,
  ]).pipe(
    //tap((ele) => console.log('selectedPro', ele)),
    map(([products, {id , flag}]) => {
      if(id === null){
        this.Store.dispatch(productActions.updateCart({products : null}));
        return null;
      }
      let matchProduct = products.find((p) => p.id == id);
      //If already added in cart
      if (this.productAddedCartList && this.productAddedCartList.find((p) => p.id == id)) {
        let updatedCartList = [];
        if(flag){
          updatedCartList = this.productAddedCartList.map((p) => p.id == id ? { ...p, qty: p.qty + 1 } : { ...p });
        }else{
          updatedCartList = this.productAddedCartList.map((p) => p.id == id ? { ...p, qty: p.qty - 1 } : { ...p });
        }
      //console.log(updatedCartList)
        this.Store.dispatch(productActions.updateCart({products : updatedCartList}));
        return updatedCartList;
      }
      //If not present in cart
      else {
        //if cart is EMPTY initially
        if (!this.productAddedCartList) {
          this.productAddedCartList = [];
          this.productAddedCartList.push(
            matchProduct
              ? matchProduct
              : {
                  id: 11,
                  name: 'Dummy',
                  inventedBy: 'Dummy',
                  imageLink: 'Url',
                  price: 123,
                  currency: 'Rs',
                  qty: 1,
                }
          );
          this.Store.dispatch(productActions.updateCart({products : this.productAddedCartList}));
          return this.productAddedCartList;
        } else {
          let cartItem = [
            ...this.productAddedCartList,
            matchProduct
              ? matchProduct
              : {
                  id: 11,
                  name: 'Dummy',
                  inventedBy: 'Dummy',
                  imageLink: 'Url',
                  price: 123,
                  currency: 'Rs',
                  qty: 1,
                },
          ];
          this.Store.dispatch(productActions.updateCart({products : cartItem}))
          return cartItem;
        }
      }
      
    })
  );

}
