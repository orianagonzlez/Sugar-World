import { Component, Input, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  user: User = null;

  constructor(    private wishListService: WishlistService,
    private authService: AuthService) { }

  ngOnInit(): void {
     this.cargarFavoritos();
  }


   cargarFavoritos(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      if (user) {
        this.wishListService.getWishList(user.uid).then((res) => {
          
          if (res.docs.length > 0) {
            this.product.isFavorite = (res.docs[0].get('favorites') as Array<
              string
            >).includes(this.product.$key);
          }
        });
      } else {
        this.product.isFavorite = false;
      }
    });
  }

    favoriteBtn(): void {
    if (this.user) {
      this.wishListService
        .addToWishList(this.user.uid, this.product.$key)
        .then(() => {
          this.product.isFavorite = !this.product.isFavorite;
        });
    }
    console.log(this.product.name +" "+ this.product.isFavorite)
  }


}
