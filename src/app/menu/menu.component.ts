import { Component } from '@angular/core';
import { EMPTY, catchError, tap } from 'rxjs';
import Product from 'src/interfaces/product';
import { ProductService } from 'src/service/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  constructor(private productService: ProductService) {}
  products$ = this.productService.allProducts$.pipe(
    //tap((products) => console.log('All pro', products)),
    catchError((error) => EMPTY)
  );

  //on Add button click
  addToolToCart(id: number) {
    this.productService.emitSelectedProductIntoStream(id);
  }
}
