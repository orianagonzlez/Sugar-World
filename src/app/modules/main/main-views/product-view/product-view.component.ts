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
  noProducts = false;
  categories: Array<Category> = [];
  filters = false;
  loading = false;
  wrongPrice = false;
  empty = false;
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
    this.empty = false;
    this.noProducts = false;
    this.wrongPrice = false;
    this.ProductService.getAllProducts().subscribe((items) => {
      this.products = items.map (
        (item) => 
        ({
          ...item.payload.doc.data(),
          $key: item.payload.doc.id,
        } as Product)
      );
      if (byName) {
        if (this.name == '') {
          this.empty = true;
        } else {
          this.products = this.products.filter((item) => item.name.toLowerCase().includes(this.name.toLowerCase()));
          this.filters = true;
        } 
      } else {
        this.name = '';
      }
      
      if (this.products.length == 0) {
        this.noProducts = true;
      }
      this.loading = false;
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

  getProductsByCategory(categoryId: string): void {
    this.empty = false;
    this.noProducts = false;
    this.wrongPrice = false;
    this.name = '';
    this.ProductService.getProductsByCategory(categoryId).then((res) => {
      
      this.products = res.docs.map(item => ({
        ...item.data(),
        $key: item.id,
      } as Product));

      if (this.products.length == 0) {
        this.noProducts = true;
      }

      this.filters = true;

    }).catch(err => console.log(err));
  }
    
  getProductsByPrice(): void {
    this.noProducts = false;
    this.empty = false;
    this.name = '';
    if ((this.min <= this.max) && (this.min >= 0) && (this.max >= 0)) {
      this.ProductService.getProductsByPrice(this.min, this.max).then((res) => {
      
        this.products = res.docs.map(item => ({
          ...item.data(),
          $key: item.id,
        } as Product));

        if (this.products.length == 0) {
          this.noProducts = true;
        }

        this.filters = true;
        this.wrongPrice = false;
      }).catch(err => console.log(err));
    } else {
      this.wrongPrice = true;
    }
    
    
  }

}
