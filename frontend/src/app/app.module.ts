import { CustomPaginatorClass } from './shared/paginatior/custom-paginator-class';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './shared/components/footer/footer.component';

import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthCenterModule } from '@iss/ng-auth-center';
import { AuthComponent } from './shared/components/auth/auth.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,

    BrowserAnimationsModule,
    HttpClientModule,
    AuthCenterModule.forRoot(environment.auth),

    RoomModule,
    UserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorClass }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
