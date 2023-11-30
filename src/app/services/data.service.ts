import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { homePhoto } from '../interfaces/home.interface';
import { About } from '../interfaces/About.interface';
import { diningData } from '../interfaces/dining.interface';
import { sendFeedback } from '../interfaces/feedback.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  databaseURL:any=""
  constructor( private database:Database , private http:HttpClient) { 
    this.databaseURL=this.database.app.options.databaseURL;
  }
    
  // get Home data
  getCarsoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/carasoul.json`)
  }
  gethomeImages():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/products.json`)
  }
  // get Dining data
  getDiningCarsoul():Observable<any[]>{
    return this.http.get<any[]>(`${this.databaseURL}/diningCarasoul.json`)
  }
  getDiningImages():Observable<any[]>{
    return this.http.get<any[]>(`${this.databaseURL}/diningImages.json`)
  }
  // get Cafes data
  getCafesCarsoul():Observable<any[]>{
    return this.http.get<any[]>(`${this.databaseURL}/cafesCarasoul.json`)
  }
  getCafesImages():Observable<any[]>{
    return this.http.get<any[]>(`${this.databaseURL}/cafesImages.json`)
  }
  // get Entertainment data
  getEntertainmentCarsoul():Observable<any[]>{
    return this.http.get<any[]>(`${this.databaseURL}/entertainmentCarasoul.json`)
  }
  getEntertainmentImages():Observable<any[]>{
    return this.http.get<any[]>(`${this.databaseURL}/entertainmentImages.json`)
  }
  // get Services data
  getServicesCarsoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/ServicesCarasoul.json`)
  }
  getServicesContent():Observable<diningData[]>{
    return this.http.get<diningData[]>(`${this.databaseURL}/ServicesContent.json`)
  }
  // get Services data
  getAboutCarsoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/AboutCarasoul.json`)
  }
  getAboutContent():Observable<About[]>{
    return this.http.get<About[]>(`${this.databaseURL}/AboutContent.json`)
  }
  // get  Feedback
  getFeedback():Observable<sendFeedback[]>{
    return this.http.get<sendFeedback[]>(`${this.databaseURL}/feedback.json`)
  }
  // get  storeLocation
  getstoreLocation():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/storeLocation.json`)
  }
  // get Services data
  getOpenningCarsoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/openningCarasoul.json`)
  }
  getOpenningImages():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/openningImages.json`)
  }
  // get clothing carasoul
  getclothingCarasoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/clothingCarasoul.json`)
  }
  // get  clothing
  getclothingImages():Observable<any[]>{
    return this.http.get<any[]>(`${this.databaseURL}/clothingImages.json`)
  }
  // get shoes carasoul
  getshoesCarasoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/shoesCarasoul.json`)
  }
  // get  shoes
  getshoesImages():Observable<any[]>{
    return this.http.get<any[]>(`${this.databaseURL}/shoesImages.json`)
  }
  // get  perfumes Carasoul
  getperfumesCarasoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/perfumesCarasoul.json`)
  }
  // get  perfumes
  getperfumesImages():Observable<any[]>{
    return this.http.get<any[]>(`${this.databaseURL}/perfumesImages.json`)
  }
  // / get  accessories carasoul
  getaccessoriesCarasoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/accessoriesCarasoul.json`)
  }
  // get  accessories
  getaccessoriesImages():Observable<any[]>{
    return this.http.get<any[]>(`${this.databaseURL}/accessoriesImages.json`)
  }
  // / get  Albairaq Tower carasoul
  getAjyalTowerCarasoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/albairaqTowerCarasoul.json`)
  }
  // get  Albairaq Tower
  getAjyalTowerImages():Observable<any[]>{
    return this.http.get<any[]>(`${this.databaseURL}/albairaqTowerImages.json`)
  }
  // / get  Mall location carasoul
  getMallLocationCarsoul():Observable<homePhoto[]>{
    return this.http.get<homePhoto[]>(`${this.databaseURL}/MallLocationCarasoul.json`)
  }
  
  // create the data
  create(data:any , position:string,key:string){
    if(key=="add")
      this.http.post(`${this.databaseURL}/${position}.json`,data).subscribe(()=>{
        location.reload();
      });
    else
      this.http.put(`${this.databaseURL}/${position}/${key}.json`,data).subscribe(()=>{
        location.reload();
      });
  }
  sendFeedback(data:any){
    this.http.post(`${this.databaseURL}/feedback.json`,data).subscribe(()=>{
      location.reload();
    });
  }
  // delete the data
  delete(position:string,key:string){
    this.http.delete(`${this.databaseURL}/${position}/${key}.json`).subscribe(()=>{
      location.reload();
    });
  }
}