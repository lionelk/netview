import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NesComponent } from './nes/nes.component';
import { LinksComponent } from './links/links.component';
import { TunnelsComponent } from './tunnels/tunnels.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'dashboard', component: DashboardComponent,
    children: [
      {path: 'nes', component: NesComponent},
      {path: 'links', component: LinksComponent},
      {path: 'tunnels', component: TunnelsComponent},
    ] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
