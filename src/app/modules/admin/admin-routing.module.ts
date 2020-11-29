import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';
import { CategoryViewComponent } from './admin-views/category-view/category-view.component';
import { EditCategoryViewComponent } from './admin-views/edit-category-view/edit-category-view.component';
import { EditViewComponent } from './admin-views/edit-view/edit-view.component';
import { MethodViewComponent } from './admin-views/method-view/method-view.component';
import { OrderViewComponent } from './admin-views/order-view/order-view.component';
import { StockViewComponent } from './admin-views/stock-view/stock-view.component';

const routes: Routes = [
  {
    path: '', //Admin
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: OrderViewComponent
      },
      {
        path: 'method',
        canActivate: [AuthGuard],
        component: MethodViewComponent
      },
      {
        path: 'stock',
        canActivate: [AuthGuard],
        component: StockViewComponent
      },
      {
        path: 'edit/:productId',
        canActivate: [AuthGuard],
        component: EditViewComponent
      },
      {
        path: 'category',
        component: CategoryViewComponent
      },
      {
        path: 'edit/category/:categoryId',
        component: EditCategoryViewComponent
      }

    ],
    component: AdminNavigationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
