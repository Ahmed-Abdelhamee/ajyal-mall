import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import {AngularFireModule, FIREBASE_OPTIONS} from '@angular/fire/compat'// write this special code for upload img 
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AjyalMallComponent } from './components/ajyal-mall/ajyal-mall.component';
import { AboutComponent } from './components/about/about.component';
import { AccessoiresComponent } from './components/accessoires/accessoires.component';
import { CafesComponent } from './components/cafes/cafes.component';
import { ClothingComponent } from './components/clothing/clothing.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DashLoginComponent } from './components/dash-login/dash-login.component';
import { DiningComponent } from './components/dining/dining.component';
import { EntertainmentComponent } from './components/entertainment/entertainment.component';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { MallLocationComponent } from './components/mall-location/mall-location.component';
import { OpeningHoursComponent } from './components/opening-hours/opening-hours.component';
import { PerfumesComponent } from './components/perfumes/perfumes.component';
import { ShoesComponent } from './components/shoes/shoes.component';
import { StoreLocatoinComponent } from './components/store-locatoin/store-locatoin.component';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@angular/router';
import { DirDirective } from './directives/dir.directive';


@NgModule({
  declarations: [
    AppComponent,
    AjyalMallComponent,
    AboutComponent,
    AccessoiresComponent,
    CafesComponent,
    ClothingComponent,
    ContactUsComponent,
    DashLoginComponent,
    DiningComponent,
    EntertainmentComponent,
    ErrorComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    MallLocationComponent,
    OpeningHoursComponent,
    PerfumesComponent,
    ShoesComponent,
    StoreLocatoinComponent,
    DirDirective
  ],
  imports: [
    RouterModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    // ToastrModule.forRoot(),
    HttpClientModule, 
    AngularFireStorageModule,
    AngularFireModule,
    AdminModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage())
  ],
  providers: [
      // write this special code for upload img 
      { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      {provide : LocationStrategy,useClass:HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
