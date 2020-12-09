import { APP_BASE_HREF } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgGridModule } from 'ag-grid-angular'

import { AgencyEditComponent } from './components/agency/agency-edit/agency-edit.component'
import { AgencyListComponent } from './components/agency/agency-list/agency-list.component'
import { AgencyService } from './components/agency/agency.service'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthService } from './auth/auth.service'
import { FooterComponent } from './components/footer/footer.component'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { ProfileComponent } from './components/profile/profile.component'
import { SignupComponent } from './components/signup/signup.component'
import { UserEditComponent } from './components/user/user-edit/user-edit.component'
import { UserListComponent } from './components/user/user-list/user-list.component'
import { GridComponent } from './grid/grid.component'
import { MaterialModule } from './material/material.module'
import { CustomHttpInterceptorService } from './noop-interceptor'
import { BotoesGridComponent } from './shared/botoes-grid/botoes-grid.component'
import { MessagesService } from './shared/messages/messages.service';
import { VacancyComponent } from './components/vacancy/vacancy.component'

@NgModule({
  declarations: [
    AppComponent,
    AgencyListComponent,
    AgencyEditComponent,
    BotoesGridComponent,
    HomeComponent,
    LoginComponent,
    UserListComponent,
    UserEditComponent,
    FooterComponent,
    GridComponent,
    SignupComponent,
    ProfileComponent,
    VacancyComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FontAwesomeModule,
  ],
  exports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AgencyService,
    MessagesService,
    AuthService,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    BotoesGridComponent,
    AgencyEditComponent,
    UserEditComponent,
  ],
})
export class AppModule { }
