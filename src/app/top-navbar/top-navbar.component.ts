import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable, of, tap } from 'rxjs';
import { ProductService } from 'src/service/product.service';
import { State } from "../state/app.state";
import * as productActions from "../state/app.actions";
import { isAdminLoggedIn } from "../state/app.reducer";
import Product from "src/interfaces/product";

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css'],
})
export class TopNavbarComponent implements OnInit {
  cartItem$ :Observable<Product[] | null> = of(null);
  isAdmin$ : Observable<boolean> = of(false);
  constructor(private Store :Store<State>,private productService: ProductService) {}


  ngOnInit(){
    this.cartItem$ = this.productService.cartList$.pipe(
      tap((product) => {
        this.productService.productAddedCartList = product;
      })
    );

    this.isAdmin$ = this.Store.select(isAdminLoggedIn);
  }
}
