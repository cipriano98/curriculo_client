import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AgencyListComponent } from './agency/agency-list/agency-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  // { path: '**', component: PageNotFound, canActivate: [AuthGuard]},
  { path: 'agency', component: AgencyListComponent, canActivate: [AuthGuard]},
  { path: 'user', component: UserListComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
