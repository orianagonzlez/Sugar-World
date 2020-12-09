import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'firebase';
import { Bag } from 'src/app/models/bag';
import { CartProduct } from 'src/app/models/cart-product';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { BagService } from 'src/app/services/bag.service';
import { CategoryService } from 'src/app/services/category.service';
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
  user: User;
  intenteAgregar = false;
  agregado = false;
  authSubscription = null;
  masDe0 = true;
  wrongPrice = false;
  excedente = false;
  seAcabo = false;


  constructor(private ProductService: ProductsService, private router: Router, private route: ActivatedRoute, private BagService: BagService, private authService: AuthService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getUrlParams();
    this.getProductById();
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('productId');
    });
  }

 
  getProductById(): void {
    this.loading = true;
    this.ProductService.getProduct(this.productId).subscribe((item) => {
      this.product = {
        $key: item.payload.id,
        ...item.payload.data(),
      };
      this.getCategory();
      this.loading = false;
    });
  }

  plus():void{
    if(this.value + 50 <= this.product.quantity && this.value + 50 <=2000){
      this.value += 50;
    }
  }

  minus():void{
    if(this.value!=0){
      this.value -= 50;
    }
  }

  addToBag():void {
    this.masDe0 = true;
    this.wrongPrice = false;
    this.excedente = false;
    this.agregado = false;
    this.seAcabo = false;
    this.intenteAgregar = true;
    this.authSubscription = this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      if (user && this.value > 0) {
        let cartProduct: CartProduct = {
          productId: this.product.$key,
          quantity: this.value,
        } 
        this.BagService.getCurrentBag(this.user.uid).then((res) => {
            if (res.docs.length <= 0) {
              let bag: Bag = {
                price: this.product.price,
                products: [cartProduct],
                userId: this.user.uid,
                weight: this.value,
                open: true,
                items: 1,
                isInCart: false,
              }
              this.BagService.createBag(bag).then((res) => {
                this.agregado = true;
              }).catch(err => console.log(err));
            } else {
              if (res.docs[0].get('price') == this.product.price) {
                let currentProducts = res.docs[0].get('products') as Array<CartProduct>;
                let pertenece = false;
                let bagWeight = res.docs[0].get('weight');

                currentProducts.map(item => {
                  if(item.productId == this.product.$key) {
                    pertenece = true;
                    if (item.quantity + this.value <= this.product.quantity) {
                      if ( bagWeight + this.value <= 2000) {
                        item.quantity += this.value; 
                        bagWeight += this.value;
                        this.agregado = true;
                      } else {
                        this.agregado = false;
                        this.excedente = true;
                      }
                      
                    } else {
                      this.seAcabo = true;
                      this.agregado = false;
                    }
                  }
                });

                if (!pertenece) {
                  if (bagWeight + this.value <= 2000) {
                    currentProducts.push(cartProduct);
                    bagWeight += this.value;
                    this.agregado = true;
                  } else {
                    this.agregado = false;
                    this.excedente = true;
                  }
                  
                } 

                if (this.agregado) {
                  let bag: Bag = {
                    price: res.docs[0].get('price'),
                    products: currentProducts,
                    userId: res.docs[0].get('userId'),
                    weight: bagWeight,
                    open: res.docs[0].get('open'),
                    items: currentProducts.length,
                    isInCart: false,
                  }
                  this.BagService.updateBag(res.docs[0].id, bag).then(res => {this.agregado = true;})
                  .catch(err => console.log(err));
                  
                }
              } else {
                this.agregado = false;
                this.wrongPrice = true;
              }
              
            }
          }).catch(err => console.log(err));  
        }   else {
          this.agregado = false;
          this.masDe0 = false;
        }
      });    
  }
  
  getCategory(): void {
    this.loading = true;
    this.categoryService.getCategory(this.product.category).subscribe((item) => {
      let category = {
        $key: item.payload.id,
        ...item.payload.data(),
      };
      this.product.category = category.name;
      this.loading = false;
    });
    
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
