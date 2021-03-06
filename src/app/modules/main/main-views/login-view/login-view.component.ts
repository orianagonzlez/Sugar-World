import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  loginForm: FormGroup = null;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    })
  }

  loginWithGoogle(){
    this.authService.loginWithGoogle().then(response => {
      this.router.navigate(['/'])
    }).catch((err) => {
      window.alert("Daros invalidos: "+ err)
      console.log(err)});
    
  }

  logOut(): void{
    this.authService.logOut().then(response => {
      this.router.navigate(['/'])
    })
  }

  onSubmit(): void{
    this.authService.loginWithCredientials(this.loginForm.get('email').value,
    this.loginForm.get('password').value).then(response => {
      this.router.navigate(['/'])
    }).catch((err) => {
      window.alert("Daros invalidos: "+ err)
      console.log(err)});;
  }

}
