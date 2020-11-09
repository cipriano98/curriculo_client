import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { AgencyComponent } from './components/agency/agency.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptorService } from './noop-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { AppMaterialModule } from './app-material/app-material.module';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AgencyComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  exports: [
    AppMaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
