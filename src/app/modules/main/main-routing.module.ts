import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { AboutUsViewComponent } from './main-views/about-us-view/about-us-view.component';
import { CurrentBagViewComponent } from './main-views/current-bag-view/current-bag-view.component';
import { DetailViewComponent } from './main-views/detail-view/detail-view.component';
import { HomeViewComponent } from './main-views/home-view/home-view.component';
import { LoginViewComponent } from './main-views/login-view/login-view.component';
import { ProductViewComponent } from './main-views/product-view/product-view.component';
import { RegisterViewComponent } from './main-views/register-view/register-view.component';
import { ShoppingCartViewComponent } from './main-views/shopping-cart-view/shopping-cart-view.component';
import { WishListComponent } from './main-views/wish-list/wish-list.component';

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
      {
        path: 'about-us', 
        component: AboutUsViewComponent
      },
      {
        path: 'product',
        component: ProductViewComponent
      },
      {
        path: 'detail/:productId',
        component: DetailViewComponent
      },
      {
        path: 'wishList',
        component: WishListComponent
      },
      {
        path: 'currentBag', 
        component: CurrentBagViewComponent
      },
      {
        path: 'shoppingCart',
        component: ShoppingCartViewComponent
      },
      //
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
