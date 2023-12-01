import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AboutDashComponent } from './about-dash/about-dash.component';
import { AccessoiresDashComponent } from './accessoires-dash/accessoires-dash.component';
import { AjyalTowerDashComponent } from './ajyal-tower-dash/ajyal-tower-dash.component';
import { CafesDashComponent } from './cafes-dash/cafes-dash.component';
import { ClothingDashComponent } from './clothing-dash/clothing-dash.component';
import { ContactusDashComponent } from './contactus-dash/contactus-dash.component';
import { HomeDashComponent } from './home-dash/home-dash.component';
import { DiningDashComponent } from './dining-dash/dining-dash.component';
import { EntertainmentDashComponent } from './entertainment-dash/entertainment-dash.component';
import { MallLocationDashComponent } from './mall-location-dash/mall-location-dash.component';
import { OpeningHoursDashComponent } from './opening-hours-dash/opening-hours-dash.component';
import { PerfumesDashComponent } from './perfumes-dash/perfumes-dash.component';
import { ShoesDashComponent } from './shoes-dash/shoes-dash.component';
import { StoreLocationDashComponent } from './store-location-dash/store-location-dash.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { ChildCompViewComponent } from './child-comp-view/child-comp-view.component';


@NgModule({
  declarations: [
    AdminComponent,  // don't forget to import the admin component in the admin module to makw it works well
    AboutDashComponent,
    AccessoiresDashComponent,
    AjyalTowerDashComponent,
    CafesDashComponent,
    ClothingDashComponent,
    ContactusDashComponent,
    HomeDashComponent,
    DiningDashComponent,
    EntertainmentDashComponent,
    MallLocationDashComponent,
    OpeningHoursDashComponent,
    PerfumesDashComponent,
    ShoesDashComponent,
    StoreLocationDashComponent,
    ChildCompViewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminModule { }
