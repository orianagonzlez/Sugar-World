import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { HomeViewComponent } from './main-views/home-view/home-view.component';
import { LoginViewComponent } from './main-views/login-view/login-view.component';
import { RegisterViewComponent } from './main-views/register-view/register-view.component';

const routes: Routes = [
  {
    path: '', //Home
    children: [
      {
        path: '',
        component: HomeViewComponent
      },
      {
        path: 'login',
        component: LoginViewComponent
      },
      {
        path: 'register',
        component: RegisterViewComponent
      },
      // {
      //   path: 'product',
      //   component: ProductViewComponent
      // },
      // {
      //   path: 'contact',
      //   component: ContactViewComponent
      // }
    ],
    component: MainNavigationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
