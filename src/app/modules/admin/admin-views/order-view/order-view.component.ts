import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Orden } from 'src/app/models/orden';
import { Order } from 'src/app/models/order';
import { OrdenService } from 'src/app/services/orden.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

  orders: Array<Orden> = [];
  loading: boolean;

  constructor(private OrdenService: OrdenService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  /*getAllOrders(): void {
    this.OrderService.getAllOrders().subscribe((items) => {
      this.orders = items.map (
        (items) => 
        ({
          ...items.payload.doc.data(),
          $key: items.payload.doc.id,
        } as Order)
      );
      this.loading = false;
    });
  }*/


  getAllOrders(): void{
    this.OrdenService.getAllOrders().subscribe((items) => {
      this.orders = items.map (
        (items) => 
        ({
          ...items.payload.doc.data(),
          $key: items.payload.doc.id,
        } as Orden)
      );
      this.loading = false;
    })
  }



}
