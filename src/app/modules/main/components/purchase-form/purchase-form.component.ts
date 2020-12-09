import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'firebase';
import { Bag } from 'src/app/models/bag';
import { Method } from 'src/app/models/method';
import { Orden } from 'src/app/models/orden';
import { Product } from 'src/app/models/product';
import { BagService } from 'src/app/services/bag.service';
import { MethodsService } from 'src/app/services/method.service';
import { OrdenService } from 'src/app/services/orden.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss']
}) 
export class PurchaseFormComponent implements OnInit {
  @Input() bags: Array<Bag>;
  @Input() user: User;
  @Input() total: number
  orderForm: FormGroup = null;
  paymentMethod = null;
  mostrarComprobante = false;
  loadingImage = false;
  methods: Array<Method>
  retiro: Array<Method>
  pago: Array<Method>
  
  
  constructor(
    private ordenService: OrdenService, 
    private  MethodService: MethodsService,
    private fb: FormBuilder, 
    private bagService : BagService,
    private productService: ProductsService
    ) { }
  

  ngOnInit(): void {
    this.createForm();
    this.getAllMethods()
    
  }

   getAllMethods(): void {
    this.MethodService.getAllMethods().subscribe((items) => {
      this.methods = items.map (
        (items) => 
        ({
          ...items.payload.doc.data(),
          $key: items.payload.doc.id,
        } as Method)

      );
      this.retiro =this.methods.filter( method => method.type=="Retiro")
      this.pago = this.methods.filter( method => method.type=="Pago")
     
    });
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
    console.log('submit')
    const newOrder: Orden = {
      userId: this.user.uid,
      userName: this.user.displayName,
      status: "pendiente",
      payment: this.orderForm.get('payment').value,
      shipping: this.orderForm.get('shipping').value,
      total: this.total
    }
    let valido = false;
    if (newOrder.payment == null || newOrder.shipping== null){
      window.alert("Para realizar la orden se requiere que rellene los campos de Metodo de pago y Metodo de entrega")
    }else{
      this.createOrder(newOrder);
      this.eliminarDelcarrito();
      this.actualizarInventario();
      this.orderForm.reset();
    }
  }

  eliminarDelcarrito():void{
    this.bags.forEach(element => {
      element.isInCart = false
      this.bagService.updateBag(element.key, element)
    });
  }

  comprobante():void{
    if(this.paymentMethod == "Pago en la tienda" || this.paymentMethod==null ){
      this.mostrarComprobante = false;
    }else{
       this.mostrarComprobante = true;
    }
  }
 

  actualizarInventario():void{
    console.log('empiezo')
    this.bags.forEach(bags => {
      bags.products.forEach( product => {
        console.log('me subscribo')
        this.productService.getProductOnce(product.productId).subscribe((item) => {
          let myProduct = ({
          $key: item.id,
          ...item.data(),
          }as Product);
          console.log('aqui voy otra vez');
          console.log(myProduct);
          let newStock = myProduct.quantity - product.quantity;
          console.log(newStock)
          myProduct.quantity = newStock;
          console.log(myProduct);
          this.productService.updateProduct(myProduct, myProduct.$key).then(res => {
            console.log(res);
          }).catch(err => console.log(err));
        });
        
        
      });
    }); 

   
  }


}

