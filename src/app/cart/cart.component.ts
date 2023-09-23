import { Component } from '@angular/core';
import { EMPTY, catchError, share, tap } from 'rxjs';
import { ProductService } from 'src/service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(private productService: ProductService) {}

  cartItems = this.productService.productAddedCartList;

  totalProductCost = this.cartItems
    ?.map((item) => item.qty * item.price)
    .reduce((initial, val) => initial + val);
}
