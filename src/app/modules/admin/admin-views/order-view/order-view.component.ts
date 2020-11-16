import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

  orders: Array<Order> = [];
  loading: boolean;

  constructor(private OrderService: OrdersService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
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
  }
}
