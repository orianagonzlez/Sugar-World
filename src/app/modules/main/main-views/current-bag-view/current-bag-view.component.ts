import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { Bag } from 'src/app/models/bag';
import { AuthService } from 'src/app/services/auth.service';
import { BagService } from 'src/app/services/bag.service';

@Component({
  selector: 'app-current-bag-view',
  templateUrl: './current-bag-view.component.html',
  styleUrls: ['./current-bag-view.component.scss']
})
export class CurrentBagViewComponent implements OnInit {
  currentBag: Bag;
  user: User;
  bolsaAbierta = true;
  loading = true;
  borrada = false;
  authSubscription = null;
  bagSubscription = null;

  constructor(private authService: AuthService, private bagService: BagService) { }

  ngOnInit(): void {
    this.getCurrentBag();
  }

  getCurrentBag(): void {
    this.authSubscription = this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      if (user) {
        this.bagService.getCurrentBag(this.user.uid).then((res) => {
            if (res.docs.length <= 0) {
              this.bolsaAbierta = false;
              this.loading = false;
            } else {
                this.bagSubscription = this.bagService.getBag(res.docs[0].id).subscribe((item) => {
              
                  this.currentBag = {
                    key: item.payload.id,
                    ...item.payload.data(),
                  };
                
                  if (this.currentBag.price == undefined) {
                    this.borrada = true;
                  }
                  this.loading = false;
                });  
              }
        }).catch(err => console.log(err));    
      }
    });
  }

  addToCart() {
    this.bolsaAbierta = false;
    this.currentBag.open = false;
    this.currentBag.isInCart = true;
    this.bagService.updateBag(this.currentBag.key, this.currentBag).then((res) => {
    }).catch(err => console.log(err));
    
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.bagSubscription) {
      this.bagSubscription.unsubscribe();
    }
    
    
  }
}
