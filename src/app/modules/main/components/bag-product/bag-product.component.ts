import { Component, Input, OnInit } from '@angular/core';
import { Bag } from 'src/app/models/bag';
import { CartProduct } from 'src/app/models/cart-product';
import { Product } from 'src/app/models/product';
import { BagService } from 'src/app/services/bag.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-bag-product',
  templateUrl: './bag-product.component.html',
  styleUrls: ['./bag-product.component.scss']
})
export class BagProductComponent implements OnInit {
  @Input() bag: Bag;
  @Input() cartProduct: CartProduct;
  currentProduct: Product;
  loading = true;
  value: number;

  constructor(private productsService: ProductsService, private bagService: BagService) { }

  ngOnInit(): void {
    this.getProductById();
    this.value = this.cartProduct.quantity;
  }

  getProductById(): void {
    this.productsService.getProduct(this.cartProduct.productId).subscribe((item) => {
      this.currentProduct = {
        $key: item.payload.id,
        ...item.payload.data(),
      };
      console.log(this.currentProduct);
      this.loading = false;
    });
    
  }

  plus(): void{
    if (this.value + 50 <= parseInt(this.currentProduct.quantity) && this.value <=2000) {
          this.value += 50;
          if (this.bag.weight + 50 <= 2000) {
            this.bag.weight += 50;
            this.bag.products.forEach((item) => {
              if (item.productId == this.cartProduct.productId) {
                item.quantity += 50;
                this.bagService.updateBag(this.bag.key, this.bag);
              }
            });
          } else {
            console.log('la bolsa se excede');
          }
          
    }
  }

  minus(): void{
    
    if (this.value - 50 > 0) {
      this.value -= 50;
      this.bag.products.forEach((item) => {
        if (item.productId == this.cartProduct.productId) {
          item.quantity -= 50;
          this.bag.weight -= 50;
          this.bagService.updateBag(this.bag.key, this.bag);
         }
      });
    } else {
      this.deleteProduct();
    }   
  }

  deleteProduct() {
    this.bag.products = this.bag.products.filter((product) => product.productId != this.cartProduct.productId);
    this.bag.items--;
    this.bag.weight -= this.cartProduct.quantity;
    this.bagService.updateBag(this.bag.key, this.bag);
    if (this.bag.products.length == 0) {
      console.log('borrando sos ' + this.bag.key);
      this.bagService.deleteBag(this.bag.key).then((res) => {console.log('borre')}).catch(err => console.log(err));
    }
    
  }
}
