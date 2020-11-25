import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  products: Array<Product> = [];
  categories: Array<Category> = [];
  filters = false;
  loading = false;
  wrongPrice = false;
  min = 0;
  max = 0;
  name = ''
  
  constructor(private ProductService: ProductsService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllProducts(false);
    this.getAllCategories();
  }

  getAllProducts(byName: boolean): void {
    this.loading = true;
    this.filters = false;
    this.ProductService.getAllProducts().subscribe((items) => {
      this.products = items.map (
        (item) => 
        ({
          ...item.payload.doc.data(),
          $key: item.payload.doc.id,
        } as Product)
      );
      if (byName) {
        this.products = this.products.filter((item) => item.name.toLowerCase().includes(this.name.toLowerCase()));
        console.log(this.products);
        this.filters = true;
      }
      
      this.loading = false;
    console.log(this.products.length +"SOS ")
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
      console.log(this.categories);
    });
  }

  getProductsByCategory(categoryId: string): void {
    this.ProductService.getProductsByCategory(categoryId).then((res) => {
      
      this.products = res.docs.map(item => ({
        ...item.data(),
        $key: item.id,
      } as Product));
      console.log(this.products);
      this.filters = true;

    }).catch(err => console.log(err));
  }

  getProductByName(): void {
    console.log(this.name);
    this.loading = true;
    this.getAllProducts(true);
    console.log('busque productos');
    console.log(this.products);
    this.products = this.products.filter((item) => item.name.toLowerCase().includes(this.name.toLowerCase()));
    console.log(this.products);
    this.loading = false;
  }

  getProductsByPrice(): void {
    console.log(this.min);
    console.log(this.max);
    if ((this.min <= this.max) && (this.min >= 0) && (this.max >= 0)) {
      this.ProductService.getProductsByPrice(this.min, this.max).then((res) => {
      
        this.products = res.docs.map(item => ({
          ...item.data(),
          $key: item.id,
        } as Product));
        console.log(this.products);
        this.filters = true;
        this.wrongPrice = false;
      }).catch(err => console.log(err));
    } else {
      this.wrongPrice = true;
    }
    
    
  }

}
