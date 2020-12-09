import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  user = this.authService.userDataSubject$;
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log('inicio')
    if (this.authService.isAuthenticated()) {
      console.log('soy admin')
      this.isAdmin = this.authService.isAdmin();
      console.log(this.isAdmin)
    }
    
  }

  //LOGOUT  
  logOut(): void {
    this.authService.logOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
