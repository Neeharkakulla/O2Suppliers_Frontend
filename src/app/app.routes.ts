import { Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SupplierDashboardComponent } from './supplier-dashboard/supplier-dashboard.component';
import { HomeComponent } from './home/home.component';
import { ImageviewerComponent } from './imageviewer/imageviewer.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    {
        path: 'userdashboard',
        component: UserDashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'suppliersdashboard',
        component: SupplierDashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'admindashboard',
        component: AdminDashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'doctordashboard',
        component: DoctorDashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'view-document',
        component: ImageviewerComponent,
        pathMatch: 'full'
      },
      {
        path: '',
        component: HomeComponent
      }
];
