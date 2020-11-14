import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioEditComponent } from './components/usuario/usuario-edit/usuario-edit.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { DashComponent } from './dash/dash.component';
import { MaterialModule } from './material/material.module';
import { CustomHttpInterceptorService } from './noop-interceptor';
import { OrganizacaoEditComponent } from './organizacao/organizacao-edit/organizacao-edit.component';
import { OrganizacaoListComponent } from './organizacao/organizacao-list/organizacao-list.component';
import { OrganizacaoService } from './organizacao/organizacao.service';
import { BotoesGridComponent } from './shared/botoes-grid/botoes-grid.component';
import { MessagesService } from './shared/messages/messages.service';

@NgModule({
  declarations: [
    AppComponent,
    OrganizacaoListComponent,
    OrganizacaoEditComponent,
    BotoesGridComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    DashComponent,
    UsuarioListComponent,
    UsuarioEditComponent,
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
  ],
  exports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    OrganizacaoService,
    MessagesService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    BotoesGridComponent,
    OrganizacaoEditComponent,
    UsuarioEditComponent,
  ],
})
export class AppModule { }
