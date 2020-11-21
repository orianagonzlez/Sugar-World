import { Component, Input, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  private user: User = null;
  @Input() products: Array<Product> = [];

  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe((value) => {
      this.user = value;
    });
  }

}
