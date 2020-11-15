import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  loginForm: FormGroup = null;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: 'email',
      password: 'password'
    })
  }

  loginWithGoogle(){
    this.authService.loginWithGoogle().then(response => {});
    this.router.navigate(['/'])
  }

  logOut(): void{
    this.authService.logOut().then(response => {
      this.router.navigate(['/'])
    })
  }

  onSubmit(): void{
    this.authService.loginWithCredientials(this.loginForm.get('email').value,this.loginForm.get('password').value);
    this.router.navigate(['/'])
  }

}
