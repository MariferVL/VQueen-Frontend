import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu/menu.component';
import { DetailedMenuComponent } from './components/menu/detailed-menu/detailed-menu.component';
import { DetailedOrderComponent } from './components/order/detailed-order/detailed-order.component';
import { KitchenComponent } from './components/kitchen/kitchen/kitchen.component';
import { OrderReceivedComponent } from './components/order/order-received/order-received.component';
import { ManagerComponent } from './components/admin/manager/manager.component';
import { EmployeesAdminComponent } from './components/admin/employees-admin/employees-admin.component';
import { MenuAdminComponent } from './components/admin/menu-admin/menu-admin.component';
import { EditMenuComponent } from './components/admin/edit-menu/edit-menu.component';
import { EditEmployeeComponent } from './components/admin/edit-employee/edit-employee.component';
import { ColabMainComponent } from './components/colab/colab-main/colab-main.component';
import { ColabOrdersComponent } from './components/colab/colab-orders/colab-orders.component';
import { NotFoundComponent } from './components/extras/not-found/not-found.component';
import { ReadyToServeComponent } from './components/kitchen/ready-to-serve/ready-to-serve.component';
import { authAdminGuard } from './guard/authAdmin/auth-admin.guard';
import { authKitchenGuard } from './guard/authKitchen/auth-kitchen.guard';
import { authColabGuard } from './guard/authColab/auth-colab.guard';
import { LoginComponent } from './components/login/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'kitchen', component: KitchenComponent,canActivate: [authKitchenGuard] },
  { path: 'vq-menu', component: MenuComponent },
  { path: 'vq-menu/:id', component: DetailedMenuComponent },
  { path: 'order', component: DetailedOrderComponent },
  { path: 'order-received', component: OrderReceivedComponent },
  { path: 'ready', component: ReadyToServeComponent },
  { path: 'admin', component: ManagerComponent, canActivate: [authAdminGuard] },
  {
    path: 'member', component: EmployeesAdminComponent,
    children: [
      { path: 'edit/:id', component: EditEmployeeComponent },
    ],
  },
  {
    path: 'menu', component: MenuAdminComponent,
    children: [
      { path: 'edit/:id', component: EditMenuComponent },
    ],
  },
  {
    path: 'colab',
    component: ColabMainComponent, canActivate: [authColabGuard],
    children: [
      { path: 'take-order', component: MenuComponent },
      { path: 'my-orders', component: ColabOrdersComponent },
    ],
  },
  // Add a wildcard route to handle unknown URLs
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
