import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-stock-view',
  templateUrl: './stock-view.component.html',
  styleUrls: ['./stock-view.component.scss']
})
export class StockViewComponent implements OnInit {

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

  deleteProduct(productId: string): void{
    this.ProductService.deleteProduct(productId).then((res) => {}).catch((err)=>console.log(err));
  }

}
