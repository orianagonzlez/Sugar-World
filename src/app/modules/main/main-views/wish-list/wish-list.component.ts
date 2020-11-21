import { Component, OnInit, ɵConsole } from '@angular/core';
import { User } from 'firebase';
import { promise } from 'protractor';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  user: User;
  products: Array<Product> = [];
  productsId: Array<string>;
  myproduct: Product;
  

  constructor( 
    private ProductService: ProductsService,   
    private wishListService: WishlistService,
    private authService: AuthService,) { }

  ngOnInit(): void {
   // this.getMyFavorites()
      
  }

  /*getMyFavorites():void {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.user = user;
        this. wishListService.getWishList(user.uid).then((res) => {
          const userWishList = res.docs[0].get('favorites') as Array<string>;

            Promise.all(
            userWishList.map((item) =>{
             // this.getProductById(item)
            })
          ).then((res) => {
            //const allProducts = res.map((item) => item.data[0]);
            console.log(res+ ' A YUDA')
          });
        });
      }
    });
  }


  
  getProductById(productId: string) {
    this.ProductService.getProduct(productId).subscribe((item) => {
      this.myproduct = {
        $key: item.payload.id,
        ...item.payload.data(),
      };
    });
  }*/




  }
