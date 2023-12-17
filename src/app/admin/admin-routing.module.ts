import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MallLocationComponent } from '../components/mall-location/mall-location.component';
import { AboutDashComponent } from './about-dash/about-dash.component';
import { AdminComponent } from './admin.component';
import { CafesDashComponent } from './cafes-dash/cafes-dash.component';
import { ClothingDashComponent } from './clothing-dash/clothing-dash.component';
import { ContactusDashComponent } from './contactus-dash/contactus-dash.component';
import { DiningDashComponent } from './dining-dash/dining-dash.component';
import { EntertainmentDashComponent } from './entertainment-dash/entertainment-dash.component';
import { PerfumesDashComponent } from './perfumes-dash/perfumes-dash.component';
import { ShoesDashComponent } from './shoes-dash/shoes-dash.component';
import { StoreLocationDashComponent } from './store-location-dash/store-location-dash.component';
import { HomeDashComponent } from './home-dash/home-dash.component';
import { AccessoiresDashComponent } from './accessoires-dash/accessoires-dash.component';
import { OpeningHoursDashComponent } from './opening-hours-dash/opening-hours-dash.component';
import { AjyalTowerDashComponent } from './ajyal-tower-dash/ajyal-tower-dash.component';
import { AdminGardGuard } from '../services/admin-gard.guard';
import { MallLocationDashComponent } from './mall-location-dash/mall-location-dash.component';

const routes: Routes = [
  {
    path:"admin",component:AdminComponent,children:[
      {path:"home",component:HomeDashComponent,canActivate:[AdminGardGuard]},
      {path:"dining",component:DiningDashComponent ,canActivate:[AdminGardGuard]},
      {path:"cafes",component:CafesDashComponent ,canActivate:[AdminGardGuard]},
      {path:"entertainment",component:EntertainmentDashComponent ,canActivate:[AdminGardGuard]},
      {path:"about",component:AboutDashComponent ,canActivate:[AdminGardGuard]},
      {path:"contactus",component:ContactusDashComponent ,canActivate:[AdminGardGuard]},
      {path:"store-location",component:StoreLocationDashComponent ,canActivate:[AdminGardGuard]},
      {path:"mall-location",component:MallLocationDashComponent ,canActivate:[AdminGardGuard]},
      {path:"clothing",component:ClothingDashComponent ,canActivate:[AdminGardGuard]},
      {path:"shoes",component:ShoesDashComponent ,canActivate:[AdminGardGuard]},
      {path:"accessories",component:AccessoiresDashComponent ,canActivate:[AdminGardGuard]},
      {path:"perfumes",component:PerfumesDashComponent ,canActivate:[AdminGardGuard]},
      {path:"openning-hours",component:OpeningHoursDashComponent ,canActivate:[AdminGardGuard]},
      // {path:"Ajyal-tower",component:AjyalTowerDashComponent ,canActivate:[AdminGardGuard]},  //this page is deleted  ->  based on client request 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
