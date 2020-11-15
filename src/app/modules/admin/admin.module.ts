import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminNavbarComponent } from './admin-components/admin-navbar/admin-navbar.component';
import { StockViewComponent } from './admin-views/stock-view/stock-view.component';
import { OrderViewComponent } from './admin-views/order-view/order-view.component';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';
import { AdminStockFormComponent } from './admin-components/admin-stock-form/admin-stock-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditViewComponent } from './admin-views/edit-view/edit-view.component';


@NgModule({
  declarations: [
    AdminNavbarComponent, 
    StockViewComponent, 
    OrderViewComponent, 
    AdminNavigationComponent, 
    AdminStockFormComponent, EditViewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
