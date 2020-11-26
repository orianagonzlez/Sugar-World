import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bag } from 'src/app/models/bag';
import { CartProduct } from 'src/app/models/cart-product';
import { Product } from 'src/app/models/product';
import { BagService } from 'src/app/services/bag.service';
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


  constructor(private ProductService: ProductsService, private router: Router, private route: ActivatedRoute, private BagService: BagService) {}

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

  addBag(){
     console.log("say hello "+ this.productId);
    
    let cartProduct: CartProduct = {
      productId : this.productId,
      quantify : 100
    }

    var bag : Bag = {
    price:5,
    products: [cartProduct],
    userId: "1234568",
    weight: 100,
    }

    this.BagService.addBag("oriana",500,cartProduct)
    .then((res)=>{
      console.log("lo lograste")
      })
    .catch((err)=>
      console.log('fail'))





    /*this.BagService.createBag(bag).then((res)=>console.log("lo lograste")).catch((err)=>
      console.log('fail'))*/
     
  }



  
}


