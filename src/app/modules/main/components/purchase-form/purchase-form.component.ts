import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'firebase';
import { Orden } from 'src/app/models/orden';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss']
})
export class PurchaseFormComponent implements OnInit {
  
  @Input() user: User;
  orderForm: FormGroup = null;
  paymentMethod = null;
  mostrarComprobante = false;
  loadingImage = false;
  
  
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
    let valido = false;
    if (newOrder.payment == null || newOrder.shipping== null){
      window.alert("Para realizar la orden se requiere que rellene los campos de Metodo de pago y Metodo de entrega")
    }else{
      this.createOrder(newOrder);
      this.orderForm.reset();
    }
  }

  comprobante():void{
    console.log('hola ')
    if(this.paymentMethod == "Pago en la tienda" || this.paymentMethod==null ){
      this.mostrarComprobante = false;
    }else{
       this.mostrarComprobante = true;
    }
  }




  
  

}
