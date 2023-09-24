import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  createForm: FormGroup = new FormGroup({});
  name: FormControl = new FormControl('', [Validators.required]);
  imageLink: FormControl = new FormControl('');
  price: FormControl = new FormControl('', [Validators.required]);
  inventedBy: FormControl = new FormControl('', [Validators.required]);
  currency: FormControl = new FormControl('INR', [Validators.required]);
  physicsConcept: FormControl = new FormControl('', [Validators.required]);
  qty: FormControl = new FormControl(1, [Validators.required]);
  constructor() {}
  ngOnInit(): void {
    this.createFormModel();
  }

  createFormModel() {
    this.createForm = new FormGroup({
      name: this.name,
      imageLink: this.imageLink,
      price: this.price,
      inventedBy: this.inventedBy,
      currency: this.currency,
      physicsConcept: this.physicsConcept,
      qty: this.qty,
    });
  }

  onCreateFormSubmit() {
    console.log(this.createForm.value);
  }

  createFormReset() {
    this.createForm.reset();
    this.qty.setValue(1);
    this.currency.setValue('INR');
  }
}
