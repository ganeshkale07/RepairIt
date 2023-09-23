import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import product from 'src/interfaces/product';
import { Subject, catchError, combineLatest, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productData = [
    {
      id: 1,
      name: 'Capacitor',
      physicsConcept: 'Energy storage in an electric field',
      multipleUses: [
        'Filtering and smoothing electrical signals',
        'Timing circuits',
        'Energy storage in power supplies',
      ],
      price: 50,
      qty: 1,
      currency: 'INR',
      inventedBy: 'Ewald Georg von Kleist',
      imageLink: 'microprocesser.png',
    },
    {
      id: 2,
      name: 'Resistor',
      physicsConcept: 'Electrical resistance',
      multipleUses: [
        'Limiting current flow',
        'Voltage division',
        'Temperature sensing',
      ],
      qty: 1,
      price: 25,
      currency: 'INR',
      inventedBy: 'Georg Simon Ohm',
      imageLink: 'microprocesser.png',
    },
    {
      id: 3,
      name: 'Transistor',
      physicsConcept: 'Amplification and switching of electronic signals',
      multipleUses: [
        'Amplification of audio and radio signals',
        'Digital logic circuits',
        'Computer processors',
      ],
      qty: 1,
      price: 10,
      currency: 'INR',
      inventedBy: 'John Bardeen, Walter Brattain, and William Shockley',
      imageLink: 'microprocesser.png',
    },
    {
      id: 4,
      name: 'Diode',
      physicsConcept: 'One-way electrical current flow',
      multipleUses: [
        'Rectification of AC to DC',
        'Signal demodulation',
        'Voltage regulation',
      ],
      price: 5,
      qty: 1,
      currency: 'INR',
      inventedBy: 'John Ambrose Fleming',
      imageLink: 'microprocesser.png',
    },
    {
      id: 5,
      name: 'Inductor',
      physicsConcept: 'Storage of electrical energy in a magnetic field',
      multipleUses: [
        'Filtering out high-frequency noise',
        'Creating energy storage in circuits',
        'Transformers in power distribution',
      ],
      price: 15,
      currency: 'INR',
      qty: 1,
      inventedBy: 'Joseph Henry',
      imageLink: 'microprocesser.png',
    },
    {
      id: 6,
      name: 'Integrated Circuit',
      physicsConcept:
        'Miniaturized electronic circuits on a semiconductor chip',
      multipleUses: [
        'Microprocessors',
        'Memory chips',
        'Control and signal processing',
      ],
      price: 17,
      qty: 1,
      currency: 'INR',
      inventedBy: 'Jack Kilby and Robert Noyce',
      imageLink: 'microprocesser.png',
    },
  ];

  //To get all product
  allProducts$ = of(this.productData);

  //create an action strem
  //when user clicked on ADD button
  selectedProductActionStream = new Subject<number>();
  selectedProductActionStream$ =
    this.selectedProductActionStream.asObservable();

  emitSelectedProductIntoStream(id: number) {
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
    })
  );

  productAddedCartList: product[] | undefined;

  constructor(private http: HttpClient) {}
}
