import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  products: Array<Product> = [];
  loading: boolean;
  
  constructor(private ProductService: ProductsService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.ProductService.getAllProducts().subscribe((items) => {
      this.products = items.map (
        (item) => 
        ({
          ...item.payload.doc.data(),
          $key: item.payload.doc.id,
        } as Product)
      );
    });
  }

}
