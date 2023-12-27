import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, catchError, of, tap } from 'rxjs';
import Product from 'src/interfaces/product';
import { ProductService } from 'src/service/product.service';
import { State } from "../state/app.state";
import { Store } from "@ngrx/store";
import { isAdminLoggedIn } from "../state/app.reducer";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isAdmin$ : Observable<boolean> = of(false);
  products$ : Observable<Product[] | null > = of(null);
  constructor(private Store :Store<State>,private productService: ProductService) {}

  //on Add button click
  addToolToCart(id: number) {
    this.productService.emitSelectedProductIntoStream(id);
  }

  ngOnInit(): void {
    this.products$ = this.productService.allProducts$.pipe(
      //tap((products) => console.log('All pro', products)),
      catchError((error) => EMPTY)
    );
    this.isAdmin$ = this.Store.select(isAdminLoggedIn);
  }
}
