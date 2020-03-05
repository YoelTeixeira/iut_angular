import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { ListComponent }      from './list/list.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import {WeaponDetailComponent} from "./weapon-detail/weapon-detail.component";
import {FightComponent} from "./fight/fight.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/hero/:id', component: HeroDetailComponent },
  { path: 'add/hero', component: HeroDetailComponent },
  { path: 'detail/weapon/:id', component: WeaponDetailComponent },
  { path: 'add/weapon', component: WeaponDetailComponent },
  { path: 'list/:entity', component: ListComponent },
  { path: 'list/', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'fight', component: FightComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
