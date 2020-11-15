import { isNgTemplate } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-stock-form',
  templateUrl: './admin-stock-form.component.html',
  styleUrls: ['./admin-stock-form.component.scss']
})
export class AdminStockFormComponent implements OnInit {

  productForm: FormGroup = null;

  editProduct: Product = null;
  productId: string;

  constructor(
    private productService: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getUrlParams();
  }

  createForm(): void {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      quantity: [''],
      price: [''],
    });
  }

  patchFormValues(): void {
    this.productForm.patchValue({
      name: this.editProduct.name,
      quantity: this.editProduct.quantity,
      price: this.editProduct.price,
    })
  }

  createProduct(newProduct: Product): void {
    this.productService.createProduct(newProduct).then(res => {

    }).catch(err => console.log(err));
  }

  updateProduct(newProduct: Product): void {
    this.productService.updateProduct(newProduct, this.productId).then(res => {
      this.router.navigate(['/admin/stock']);
    }).catch(err => console.log(err))
  }

  onSubmit(): void {
    const newProduct: Product = {
      name: this.productForm.get('name').value,
      description: this.productForm.get('description').value,
      quantity: this.productForm.get('quantity').value,
      price: this.productForm.get('price').value,
    }

    if (this.editProduct) {
      this.updateProduct(newProduct);
      return;
    }

    this.createProduct(newProduct);
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('productId');

      if (this.productId) {
        this.productService.getProduct(this.productId).subscribe((item) => {
          this.editProduct = {
            $key: item.payload.id,
            ...item.payload.data(),
          };
          this.productForm.patchValue({
            name: this.editProduct.name,
            quantity: this.editProduct.quantity,
            price: this.editProduct.price
          });
        });
      }
    });
  }

}
