import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeViewComponent } from './main-views/home-view/home-view.component';
import { LoginViewComponent } from './main-views/login-view/login-view.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterViewComponent } from './main-views/register-view/register-view.component';
import { AboutUsViewComponent } from './main-views/about-us-view/about-us-view.component';


@NgModule({
  declarations: [
    NavbarComponent,
    HomeViewComponent, 
    LoginViewComponent, 
    MainNavigationComponent, RegisterViewComponent, AboutUsViewComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MainModule { }
