import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeViewComponent } from './main-views/home-view/home-view.component';
import { LoginViewComponent } from './main-views/login-view/login-view.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterViewComponent } from './main-views/register-view/register-view.component';
import { ProductViewComponent } from './main-views/product-view/product-view.component';
import { DetailViewComponent } from './main-views/detail-view/detail-view.component';


@NgModule({
  declarations: [
    NavbarComponent,
    HomeViewComponent, 
    LoginViewComponent, 
    MainNavigationComponent, RegisterViewComponent, ProductViewComponent, DetailViewComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MainModule { }
