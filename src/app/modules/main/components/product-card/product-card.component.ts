import { Component, Input, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  user: User = null;
  loading = false;

  constructor(private categoryService: CategoryService, private wishListService: WishlistService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getCategory();
    this.cargarFavoritos();
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
  }


}
