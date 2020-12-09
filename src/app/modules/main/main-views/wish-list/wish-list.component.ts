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
  allProducts: Array<Product> = [];
  loading = false;
  hayProductos = false;

  constructor(
    private ProductService: ProductsService,
    private wishListService: WishlistService,
    private authService: AuthService,) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.loading = true;
    this.ProductService.getAllProducts().subscribe((items) => {
      this.allProducts = items.map(
        (item) =>
          ({
            ...item.payload.doc.data(),
            $key: item.payload.doc.id,
          } as Product)
      );
      this.loading = false;
      this.getMyFavorites();
    });
  }

  getMyFavorites(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.user = user;

        this.wishListService.getWishList(user.uid).then((res) => {
          if (res.docs.length > 0) {
            this.hayProductos = true;
            const userWishList = res.docs[0].get('favorites') as Array<string>;
            if (userWishList.length == 0) {
              this.hayProductos = false;
            }
            this.products = this.allProducts.filter((item) => userWishList.includes(item.$key));
          } else {
            this.hayProductos = false;
          }

        });
      }

    });
  }

}
