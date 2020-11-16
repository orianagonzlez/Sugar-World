import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-admin-order-form',
  templateUrl: './admin-order-form.component.html',
  styleUrls: ['./admin-order-form.component.scss']
})
export class AdminOrderFormComponent implements OnInit {

  orderForm: FormGroup = null;

  @Input() editOrder: Order = null;

  constructor(private orderService: OrdersService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void{
    this.orderForm = this.fb.group({
      client: [''],
      status: [''],
    });
  }
  
  createOrder(newOrder: Order): void {
    this.orderService.createOrder(newOrder).then(res => {

    }).catch(err => console.log(err));
  }

  onSubmit(): void {
    const newOrder: Order = {
      client:this.orderForm.get('client').value,
      status: this.orderForm.get('status').value,
    }
    this.createOrder(newOrder);
  }
}
