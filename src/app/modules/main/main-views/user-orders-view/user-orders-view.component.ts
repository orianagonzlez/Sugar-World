import { Component, OnInit } from '@angular/core';
import { ɵELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';
import { User } from 'firebase';
import { Orden } from 'src/app/models/orden';
import { AuthService } from 'src/app/services/auth.service';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
  selector: 'app-user-orders-view',
  templateUrl: './user-orders-view.component.html',
  styleUrls: ['./user-orders-view.component.scss']
})
export class UserOrdersViewComponent implements OnInit {
  user: User;

  constructor(private ordenService: OrdenService,  private authService: AuthService) { }

  orders: Array<Orden>
  hayProductos = false

  ngOnInit(): void {
    this.getMyOrders()

    
    

  }
  getMyOrders(){
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.user = user;
        this.ordenService.getUserOrders(user.uid).then((res) => {
          if (res.docs.length > 0) {
          this.hayProductos = true;
          this.orders = res.docs.map(item => ({
          ...item.data(),
          key: item.id,
        } as Orden));
          }
        });
      }
    });


  }




  

}
