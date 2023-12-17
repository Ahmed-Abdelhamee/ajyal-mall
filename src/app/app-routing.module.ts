import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CafesComponent } from './components/cafes/cafes.component';
import { ClothingComponent } from './components/clothing/clothing.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DashLoginComponent } from './components/dash-login/dash-login.component';
import { DiningComponent } from './components/dining/dining.component';
import { EntertainmentComponent } from './components/entertainment/entertainment.component';
import { ErrorComponent } from './components/error/error.component';
import { MallLocationComponent } from './components/mall-location/mall-location.component';
import { OpeningHoursComponent } from './components/opening-hours/opening-hours.component';
import { PerfumesComponent } from './components/perfumes/perfumes.component';
import { ShoesComponent } from './components/shoes/shoes.component';
import { AccessoiresComponent } from './components/accessoires/accessoires.component';
import { StoreLocatoinComponent } from './components/store-locatoin/store-locatoin.component';
import { AjyalMallComponent } from './components/ajyal-mall/ajyal-mall.component';
import { HomeComponent } from './components/home/home.component';
import { AdminGardGuard } from './services/admin-gard.guard';

const routes: Routes = [
  {path:"" , component: HomeComponent},
  {path:"home" , component: HomeComponent},
  {path:"clothing" , component: ClothingComponent},
  {path:"shoes" , component: ShoesComponent},
  {path:"accessories" , component: AccessoiresComponent},
  {path:"perfumes" , component: PerfumesComponent},
  {path:"dining" , component: DiningComponent},
  {path:"cafes" , component: CafesComponent},
  {path:"entertainment" , component: EntertainmentComponent},
  {path:"about" , component:AboutComponent},
  {path:"opening-hours" , component:OpeningHoursComponent},
  {path:"mall-location" , component:MallLocationComponent},
  {path:"store-location" , component:StoreLocatoinComponent},
  {path:"contact-us" , component:ContactUsComponent},
  // {path:"ajyal-tower" , component: AjyalMallComponent}, // this page is deleted  ->  based on client request 
  {path:"ajyal-0-admin-0-mall" , component: DashLoginComponent},
  {path:"**" , component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
