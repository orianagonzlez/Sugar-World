import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Bag } from 'src/app/models/bag';
import { ShoppingCart } from 'src/app/models/Shopping-cart';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {


  products: Array<Product> = [];
  
  constructor(private ProductService: ProductsService, private CartService: ShoppingCartService ) { }

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
