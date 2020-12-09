


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
    this.getCurrentUser();
    
  }

  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe((value) => {
      if (value) {
        this.isAdmin = this.authService.isAdmin();
      }
    });
  }
  //LOGOUT  
  logOut(): void {
    this.authService.logOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
