import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: 'home',
    loadChildren: () => import ("../app/modules/main/main.module").then (m => m.MainModule)
    
  },
  {
    path: 'admin',
    loadChildren: () => import ("../app/modules/admin/admin.module").then (m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
