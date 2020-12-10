import { isNgTemplate } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  valid = true;
  negativo = false;

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
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image:[''],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
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
 
    
    if (this.productForm.valid) {
      this.valid = true;
      if (newProduct.price > 0 && newProduct.quantity > 0) {
        
        this.negativo = false;
        if (this.editProduct) {
          this.productForm.reset()
          this.loadingImage = false;
          this.updateProduct(newProduct);
          this.valid = true;
          return;
        }

        if (this.loadingImage) {
          this.createProduct(newProduct);
          this.valid = true;
          this.productForm.reset()
          this.loadingImage = false;
        } else {
          this.valid = false;
        }
        
      } else {
        this.negativo = true;
      }
      
    } else {
        this.valid = false;
    }
    
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
