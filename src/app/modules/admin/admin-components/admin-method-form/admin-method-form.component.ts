import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Method } from 'src/app/models/method';
import { MethodsService } from 'src/app/services/method.service';

@Component({
  selector: 'app-admin-method-form',
  templateUrl: './admin-method-form.component.html',
  styleUrls: ['./admin-method-form.component.scss']
})
export class AdminMethodFormComponent implements OnInit {

  methodForm: FormGroup = null;

  @Input() editMethod: Method = null;

  constructor(private methodService: MethodsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void{
    this.methodForm = this.fb.group({
      type: [''],
      name: [''],
      attachement: ['']
    });
  }
  
  createMethod(newMethod: Method): void {
    this.methodService.createMethod(newMethod).then(res => {

    }).catch(err => console.log(err));
  }

  onSubmit(): void {
    const newMethod: Method = {
      type:this.methodForm.get('type').value,
      name:this.methodForm.get('name').value,
      attachement: this.methodForm.get('attachement').value,
    }
    this.createMethod(newMethod);
    this.methodForm.reset()
  }
}
