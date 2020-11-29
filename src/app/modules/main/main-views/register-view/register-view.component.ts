import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss']
})
export class RegisterViewComponent implements OnInit {

  registerForm: FormGroup = null;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: '',
      password: '',
    });
  }

  onSubmit(): void{

    this.authService.singUpWithCredentials(this.registerForm.get('email').value,
    this.registerForm.get('password').value).then(() => {
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        window.alert("Datos invalidos: "+err)
        console.log('error!', err)});
  }

    loginWithGoogle(){
    this.authService.loginWithGoogle().then(response => {
      this.router.navigate(['/'])
    }).catch((err) => {
      window.alert("Daros invalidos: "+ err)
      console.log(err)});
    
  }

}
