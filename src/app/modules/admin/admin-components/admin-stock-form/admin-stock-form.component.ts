import { isNgTemplate } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-stock-form',
  templateUrl: './admin-stock-form.component.html',
  styleUrls: ['./admin-stock-form.component.scss']
})
export class AdminStockFormComponent implements OnInit {

  productForm: FormGroup = null;
  image: any = null;
  editProduct: Product = null;
  productId: string;
  categories: Array<Category> = [];
  loadingImage = false;

  constructor(
    private productService: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getUrlParams();
    this.getAllCategories();
  }

  createForm(): void {
    this.productForm = this.fb.group({
      name: [''],
      category: [''],
      description: [''],
      image:[''],
      quantity: [''],
      price: [''],
    });
  }

  patchFormValues(): void {
    this.productForm.patchValue({
      name: this.editProduct.name,
      category: this.editProduct.category,
      description: this.editProduct.description,
      image:[''],
      quantity: this.editProduct.quantity,
      price: this.editProduct.price,
    })
  }

  
  createProduct(newProduct: Product): void {
    this.productService.createProduct(newProduct, this.image)
  }

  updateProduct(newProduct: Product): void {
    if(this.image==null){
         this.productService.updateProduct(newProduct, this.productId).then(res => {
      this.router.navigate(['/admin/stock']);
    }).catch(err => console.log(err))
    }else{
      this.productService.updateProduct(newProduct, this.productId, this.image).then(res => {
      this.router.navigate(['/admin/stock']);
    }).catch(err => console.log(err))
    }
  }

  onSubmit(): void {
    const newProduct: Product = {
      name: this.productForm.get('name').value,
      category: this.productForm.get('category').value,
      description: this.productForm.get('description').value,
      image: this.productForm.get('image').value,
      quantity: this.productForm.get('quantity').value,
      price: this.productForm.get('price').value,
      isFavorite: false,
    }

    this.productForm.reset()

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
            category: this.editProduct.category,
            description: this.editProduct.description,
            image: this.editProduct.image,
            quantity: this.editProduct.quantity,
            price: this.editProduct.price
          });
        });
      }
    });
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe((items) => {
      this.categories = items.map (
        (item) => 
        ({
          ...item.payload.doc.data(),
          $key: item.payload.doc.id,
        } as Category)
      );
    });
  }

    handleImage(event : any ){
    this.image = event.target.files[0]; 
    this.loadingImage = !this.loadingImage;
  }


}
