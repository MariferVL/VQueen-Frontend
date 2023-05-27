import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu/menu.component';
import { DetailedMenuComponent } from './components/menu/detailed-menu/detailed-menu.component';
import { DetailedOrderComponent } from './components/order/detailed-order/detailed-order.component';
import { KitchenComponent } from './components/kitchen/kitchen/kitchen.component';
import { ReadyComponent } from './components/kitchen/ready/ready.component';
import { LocationsComponent } from './components/extras/locations/locations.component';
import { ContactComponent } from './components/extras/contact/contact.component';
import { UsernameModalComponent } from './components/modals/username-modal/username-modal.component';
import { OrderModalComponent } from './components/modals/order-modal/order-modal.component';
import { OrderReceivedComponent } from './components/order/order-received/order-received.component';
import { ManagerComponent } from './components/admin/manager/manager.component';
import { MenuAdminComponent } from './components/admin/menu-admin/menu-admin.component';
import { EmployeesAdminComponent } from './components/admin/employees-admin/employees-admin.component';
import { EditEmployeeComponent } from './components/admin/edit-employee/edit-employee.component';
import { EditMenuComponent } from './components/admin/edit-menu/edit-menu.component';
import { NotFoundComponent } from './components/extras/not-found/not-found.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { MenuFormComponent } from './components/forms/menu-form/menu-form.component';
import { NavBarComponent } from './components/extras/nav-bar/nav-bar.component';
import { ColabMainComponent } from './components/colab/colab-main/colab-main.component';
import { AddEmployeeComponent } from './components/admin/add-employee/add-employee.component';
import { EmployeeFormComponent } from './components/forms/employee-form/employee-form.component';
import { ColabOrdersComponent } from './components/colab/colab-orders/colab-orders.component';
import { AuthService } from './services/auth.service';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    DetailedMenuComponent,
    DetailedOrderComponent,
    KitchenComponent,
    ReadyComponent,
    LocationsComponent,
    ContactComponent,
    UsernameModalComponent,
    OrderModalComponent,
    OrderReceivedComponent,
    EditMenuComponent,
    ManagerComponent,
    MenuAdminComponent,
    EmployeesAdminComponent,
    EditEmployeeComponent,
    NotFoundComponent,
    AddProductComponent,
    MenuFormComponent,
    NavBarComponent,
    ColabMainComponent,
    AddEmployeeComponent,
    EmployeeFormComponent,
    ColabOrdersComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
