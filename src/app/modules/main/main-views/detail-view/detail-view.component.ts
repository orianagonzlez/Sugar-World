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

  loading = false;
  product: Product = null;
  editProduct: Product = null;
  productId: string;
  products: Array<Product> = [];
  value: number = 0;

  constructor(private ProductService: ProductsService, private router: Router, private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.getUrlParams();
    this.getProductById();
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('productId');
    });
    console.log("ID:", this.productId);
  }


  getProductById(): void {
    this.loading = true;
    this.ProductService.getProduct(this.productId).subscribe((item) => {
      this.product = {
        $key: item.payload.id,
        ...item.payload.data(),
      };
      this.loading = false;
    });
  }

  plus():void{
    if(this.value<parseInt(this.product.quantity)){
      this.value ++;
    }
  }

  minus():void{
    if(this.value!=0){
      this.value --;
    }
  }
}


