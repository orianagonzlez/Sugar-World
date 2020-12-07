import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { Orden } from 'src/app/models/orden';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
  selector: 'app-purchase-view',
  templateUrl: './purchase-view.component.html',
  styleUrls: ['./purchase-view.component.scss']
})
export class PurchaseViewComponent implements OnInit {

  @Input() user: User 
  orderForm: FormGroup = null;

  constructor(private ordenService: OrdenService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void{
    this.orderForm = this.fb.group({
      payment: [''],
      shipping: ['']
    });
  }
  createOrder(newOrder: Orden): void {
    this.ordenService.createOrder(newOrder).then(res => {

    }).catch(err => console.log(err));
  }

  onSubmit(): void {
    const newOrder: Orden = {
      userId: this.user.uid,
      userName: this.user.displayName,
      status: "pendiente",
      payment: this.orderForm.get('payment').value,
      shipping: this.orderForm.get('shipping').value
    }
    this.createOrder(newOrder);
    this.orderForm.reset();
  }



 

}
