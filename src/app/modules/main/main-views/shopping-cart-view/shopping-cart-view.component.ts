import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Bag } from 'src/app/models/bag';
import { AuthService } from 'src/app/services/auth.service';
import { BagService } from 'src/app/services/bag.service';

@Component({
  selector: 'app-shopping-cart-view',
  templateUrl: './shopping-cart-view.component.html',
  styleUrls: ['./shopping-cart-view.component.scss']
})
export class ShoppingCartViewComponent implements OnInit {
  bags: Array<Bag> = [];
  user: User;
  hayBolsas = true;
  loading = true;
  modificada = false;

  constructor(private authService: AuthService, private bagService: BagService) { }

  ngOnInit(): void {
    this.getUserBags();
  }

  getUserBags(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      if (user) {
        this.bagService.getUserBags(this.user.uid).then((res) => {
            if (res.docs.length <= 0) {
              this.hayBolsas = false;
              this.loading = false;
            } else {
                console.log(res.docs.length);
                res.docs.forEach((bag) => {
                  this.bagService.getBag(bag.id).subscribe((item) => {
                    let currentBag = {
                      key: item.payload.id,
                      ...item.payload.data(),
                    };

                    console.log(currentBag);
                    this.bags.forEach((item) => {
                      if (item.key == currentBag.key) {
                        console.log('soy igual');
                        item = currentBag;
                        this.modificada = true;
                      }
                    });

                    if (!this.modificada) {
                      this.bags.push(currentBag);
                    }
                    
                    if (this.bags.length == 0) {
                      this.hayBolsas = false;
                    }
                    this.modificada = false;
                  });  
                });
                this.loading = false; 
                console.log(this.bags);
              }
        }).catch(err => console.log(err));    
      }
    });
  }

}
