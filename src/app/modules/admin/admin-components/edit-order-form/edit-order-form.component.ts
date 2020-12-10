import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Orden } from 'src/app/models/orden';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
  selector: 'app-edit-order-form',
  templateUrl: './edit-order-form.component.html',
  styleUrls: ['./edit-order-form.component.scss']
})
export class EditOrderFormComponent implements OnInit {

  statusForm: FormGroup = null;
  editOrder: Orden = null;
  orderKey: string;
  valid = true;

  constructor(
    private OrdenService: OrdenService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getUrlParams();
  }

  createForm(): void {
    this.statusForm = this.fb.group({
      key: ['', Validators.required],
      userId: ['', Validators.required],
      userName: [''],
      status: ['', Validators.required],
      payment: ['', Validators.required],
      shipping: ['', Validators.required],
      total: ['', Validators.required],
    });
  }

  patchFormValues(): void {
    this.statusForm.patchValue({
      key: this.editOrder.key,
      userId: this.editOrder.userId,
      userName: this.editOrder.userName,
      status: this.editOrder.status,
      payment: this.editOrder.payment,
      shipping: this.editOrder.shipping,
      total: this.editOrder.total,
    })
  }

  createOrder(newOrder: Orden): void {
    this.OrdenService.createOrder(newOrder)
  }

  updateOrder(newOrder: Orden): void {
    this.OrdenService.updateOrder(newOrder, this.orderKey).then(res => {
      this.router.navigate(['/admin/']);
    }).catch(err => console.log(err))
  }

  onSubmit(): void {
    const newOrder: Orden = {
      key: this.statusForm.get('key').value,
      userId: this.statusForm.get('userId').value,
      userName: this.statusForm.get('userName').value,
      status: this.statusForm.get('status').value,
      payment: this.statusForm.get('payment').value,
      shipping: this.statusForm.get('shipping').value,
      total: this.statusForm.get('total').value,
    }
    
    if (this.statusForm.valid) {
      this.statusForm.reset()
      this.updateOrder(newOrder);
      this.valid = true;
    } else {
      this.valid = false;
    }
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      this.orderKey = params.get('orderKey');

      if (this.orderKey) {
        this.OrdenService.getOrder(this.orderKey).subscribe((item) => {
          this.editOrder = {
            key: item.payload.id,
            ...item.payload.data(),
          };
          this.statusForm.patchValue({
            key: this.editOrder.key,
            userId: this.editOrder.userId,
            userName: this.editOrder.userName,
            status: this.editOrder.status,
            payment: this.editOrder.payment,
            shipping: this.editOrder.shipping,
            total: this.editOrder.total,
          });
        });
      }
    });
  }
}
