import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { ProductService } from 'src/service/product.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css'],
})
export class TopNavbarComponent {
  constructor(private productService: ProductService) {}
  cartItem$ = this.productService.cartList$.pipe(
    tap((product) => {
      console.log('Added Product', product);
      this.productService.productAddedCartList = product;
    })
  );
}
