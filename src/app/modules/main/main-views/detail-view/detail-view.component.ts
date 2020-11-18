import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {

  loading: boolean;
  product: Product = null;
  editProduct: Product = null;
  productId: string;
  products: Array<Product> = [];


  constructor(private ProductService: ProductsService, private router: Router, private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.getUrlParams();
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('productId');

      if (this.productId) {
        this.ProductService.getProduct(this.productId).subscribe((item) => {
          this.editProduct = {
            $key: item.payload.id,
            ...item.payload.data(),
          };
        });
      }
    });
    console.log("ID:", this.productId);
  }
}
