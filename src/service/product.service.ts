import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import product from 'src/interfaces/product';
import { Subject, catchError, combineLatest, map, of, tap } from 'rxjs';
import productData from '../mockData/productDataAPI';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productData = productData;

  productAddedCartList: product[] | null = null;

  constructor(private http: HttpClient) {}

  //To get all product
  allProducts$ = of(this.productData);

  //create an action strem
  //when user clicked on ADD button
  selectedProductActionStream = new Subject<number | null>();
  selectedProductActionStream$ =
    this.selectedProductActionStream.asObservable();

  emitSelectedProductIntoStream(id: number | null) {
    this.selectedProductActionStream.next(id);
  }

  //push data into cart
  cartList$ = combineLatest([
    this.allProducts$,
    this.selectedProductActionStream$,
  ]).pipe(
    tap((ele) => console.log('selectedPro', ele)),
    map(([products, id]) => {
      let matchProduct = products.find((p) => p.id == id);
      if(id ===  null){
        this.productAddedCartList = null;
        return this.productAddedCartList;
      }else{
        //If already added in cart
      if (
        this.productAddedCartList &&
        this.productAddedCartList.find((p) => p.id == id)
      ) {
        return this.productAddedCartList.map((p) =>
          p.id == id ? { ...p, qty: p.qty + 1 } : { ...p }
        );
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
          return this.productAddedCartList;
        } else {
          return [
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
        }
      }
      }
    })
  );

}
