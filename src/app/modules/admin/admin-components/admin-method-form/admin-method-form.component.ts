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

    if (this.methodForm.valid) {
      if (newMethod.type.toLowerCase() == 'pago') {
        if (newMethod.attachement == "" || !newMethod.attachement) {
          this.valid = false;
        } else {
          this.valid = true;
          this.createMethod(newMethod);
          this.methodForm.reset();
        }
      } else if (newMethod.type.toLowerCase() == 'retiro') {
        this.valid = true;
        newMethod.attachement = "-";
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
