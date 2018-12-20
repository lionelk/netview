import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NesComponent } from './nes/nes.component';
import { LinksComponent } from './links/links.component';
import { TunnelsComponent } from './tunnels/tunnels.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';
import { NeDetailComponent } from './ne-detail/ne-detail.component';
import { TunnelDetailComponent } from './tunnel-detail/tunnel-detail.component';
import { TunnelSearchComponent } from './tunnel-search/tunnel-search.component';
import { MaterialModule } from './material';
import { SigninComponent } from './signin/signin.component';
import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { LoginService } from './login.service';
import { TunnelViewComponent } from './tunnel-view/tunnel-view.component';
import { NetworkViewComponent } from './network-view/network-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NesComponent,
    LinksComponent,
    TunnelsComponent,
    DashboardComponent,
    MessagesComponent,
    NeDetailComponent,
    TunnelDetailComponent,
    TunnelSearchComponent,
    SigninComponent,
    TunnelViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [ AlertService, AuthenticationService, LoginService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
