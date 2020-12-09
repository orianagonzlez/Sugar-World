import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Method } from 'src/app/models/method';
import { MethodsService } from 'src/app/services/method.service';

@Component({
  selector: 'app-admin-method-form',
  templateUrl: './admin-method-form.component.html',
  styleUrls: ['./admin-method-form.component.scss']
})
export class AdminMethodFormComponent implements OnInit {

  methodForm: FormGroup = null;
  valid = true;
  metodoCorrecto = true;

  @Input() editMethod: Method = null;

  constructor(private methodService: MethodsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void{
    this.methodForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      attachement: ['']
    });
  }
  
  createMethod(newMethod: Method): void {
    this.methodService.createMethod(newMethod).then(res => {

    }).catch(err => console.log(err));
  }

  onSubmit(): void {
    this.metodoCorrecto = true;
    this.valid = true;
    const newMethod: Method = {
      type:this.methodForm.get('type').value,
      name:this.methodForm.get('name').value,
      attachement: this.methodForm.get('attachement').value,
    }

    console.log(this.methodForm.valid)
    if (this.methodForm.valid) {
      if (newMethod.type.toLowerCase() == 'pago') {
        if (newMethod.attachement == "" || !newMethod.attachement) {
          this.valid = false;
          console.log(newMethod.attachement)
          console.log('no andi')
        } else {
          console.log(newMethod.attachement)
          this.valid = true;
          newMethod.type = newMethod.type = 'Pago';
          this.createMethod(newMethod);
          this.methodForm.reset();
        }
      } else if (newMethod.type.toLowerCase() == 'retiro') {
        this.valid = true;
        console.log('aqui')
        newMethod.attachement = "-";
        newMethod.type = newMethod.type = 'Retiro';
        this.createMethod(newMethod);
        this.methodForm.reset();
      } else {
        this.metodoCorrecto = false;
      }
      
    } else {
      this.valid = false;
    }
    
  }
}
