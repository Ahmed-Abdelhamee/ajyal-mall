import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-perfumes-dash',
  templateUrl: './perfumes-dash.component.html',
  // adding a css file to a component => Keep in mind that the URL should be relative to the component folder.
  styleUrls: ['./perfumes-dash.component.scss',"../z-admin-style/admin-style.css"]
})
export class PerfumesDashComponent implements OnInit {

  // data variables
  parttext:string="";
  productURL:string="";
  CarasoulURL:string="";
  datalist:any[]=[];
  databaseURL:any="";
  // variables for controll the view
  Basic_part_of_control:string="";
  action_Will_Be_Done:string="";
  type_of_data_in_part:string="";
  uploadingImg:string="null";
  uploadingCarasoul:string="null";
  // for check update
  updateObject:any;
  // for check delete
  deletedObject: any;
  // for popup deleted item show
  showDeleteDiv:boolean=false;
  // for adding 
  perfumesImg=this.fb.group({
    img:[""],
    url:[""],
    id:[new Date().getTime()]
  })

  constructor(private route:Router,private fb:FormBuilder ,private auth:AdminAuthService ,private dataServ:DataService , private http:HttpClient, private firestorage:AngularFireStorage) { 
  }

  ngOnInit(): void {
    this.openPart('table data','perfumes-carsouel','')
  }


// ------------------------------------- send data to add to database -----------------------------------
  
  // ------------- Carasoul function for perfumes -----------------
  sendCarasoul(type_of_data_in_part:string,action_Will_Be_Done:string){
    this.perfumesImg.patchValue({
      img:this.CarasoulURL,
    })
    // add carasoul
    if(type_of_data_in_part=="perfumes-carsouel" && action_Will_Be_Done =="add")
    {
      this.dataServ.create(this.perfumesImg.value,"perfumesCarasoul","add");
    }
    // edit carasoul
    else if(type_of_data_in_part=="perfumes-carsouel" && action_Will_Be_Done =="edit"){
      this.dataServ.getperfumesCarasoul().subscribe(data=>{
        for (const key in data) {
          if(this.updateObject.id==data[key].id){
            this.perfumesImg.patchValue({
              id:Number(this.updateObject.id)
            })
            this.dataServ.create(this.perfumesImg.value,"perfumesCarasoul",key);
            if(this.CarasoulURL!="")
            this.firestorage.storage.refFromURL(this.updateObject.img!).delete()
            break;
          }
        }
      })
    }
    this.uploadingCarasoul="null";
  }
  // ------------- product function for perfumes -----------------
  sendProducts(type_of_data_in_part:string,action_Will_Be_Done:string){
    this.perfumesImg.patchValue({
      img:this.productURL
    })
    if(type_of_data_in_part=="perfumes-products" && action_Will_Be_Done =="add"){
      this.dataServ.create(this.perfumesImg.value,"perfumesImages","add");
    }
    else if(type_of_data_in_part=="perfumes-products" && action_Will_Be_Done =="edit"){
      this.dataServ.getperfumesImages().subscribe(data=>{
        this.perfumesImg.patchValue({
          id:Number(this.updateObject.id)
        })
        // code for if there is no change for one of product elements
        if(this.perfumesImg.get("img")?.value==""){
          this.perfumesImg.patchValue({
            img:this.updateObject.img
          })
        }else if(this.perfumesImg.get("url")?.value==""){
          this.perfumesImg.patchValue({
            url:this.updateObject.url
          })
        }
        for (const key in data) {
          if(this.updateObject.id==data[key].id){
            this.dataServ.create(this.perfumesImg.value,"perfumesImages",key);
            if(this.productURL!="")
            this.firestorage.storage.refFromURL(this.updateObject.img!).delete()
            break;
          }
        }
      })
    }
    this.uploadingImg="null";
  }

  // ------------------------------------- open part ------------------------------------------
  openPart(part:string,type:string,action:string){
    this.parttext=`the show of ${type}`
    this.Basic_part_of_control=part;
    this.action_Will_Be_Done=action;
    this.type_of_data_in_part=type;
    // delete texts and old data
    this.uploadingCarasoul=""
    this.uploadingImg=""
    this.showDeleteDiv=false
    if(part=="table data"){
      this.showdata(type);
    }
    this.perfumesImg.patchValue({
      url:""
    })
  }

  // ------------------------------------ show data table -------------------------------------
  showdata(type:string){
    this.datalist=[]
    this.type_of_data_in_part=type;
    if(type=="perfumes-carsouel"){
      this.dataServ.getperfumesCarasoul().subscribe(data=>{
        for (const key in data) {
          this.datalist.push(data[key])
        }
      })
    }else  if(type=="perfumes-products"){
      this.dataServ.getperfumesImages().subscribe(data=>{
        for (const key in data) {
          this.datalist.push(data[key])
        }
      })
    }
  }

  // --------------------------------------- update part ---------------------------------------
  update(item:any,action_Will_Be_Done:string){
    this.updateObject=item;
    if(this.type_of_data_in_part=='perfumes-carsouel' && action_Will_Be_Done=='edit')
      {
        this.action_Will_Be_Done=action_Will_Be_Done
      } else if(this.type_of_data_in_part=='perfumes-products' && action_Will_Be_Done=='edit')
      {
        this.perfumesImg.patchValue({
          url:this.updateObject.url
        })
        this.action_Will_Be_Done=action_Will_Be_Done
      }
  }

  // --------------------------------------- delete part ---------------------------------------
  DeleteSure(item:any){
    this.deletedObject=item;
    this.showDeleteDiv=true;
  }
  deleteDone(){
    this.deleteItem(this.deletedObject,"delete");
    this.showDeleteDiv=false;
  }
  cancel_delete(){
    this.showDeleteDiv=false;
  }
  deleteItem(item:any,action_Will_Be_Done:string){
    //----------- delete carasoul -----------
    if(this.type_of_data_in_part=='perfumes-carsouel' && action_Will_Be_Done=='delete')
    {
      this.action_Will_Be_Done=action_Will_Be_Done;
      this.dataServ.getperfumesCarasoul().subscribe(data=>{
        for (const key in data) {
          if(item.id==data[key].id){
            this.dataServ.delete("perfumesCarasoul",key);
            this.firestorage.storage.refFromURL(this.deletedObject.img!).delete()
            break;
          }
        }
      })
      // ----------- delete content -----------
    } else if(this.type_of_data_in_part=='perfumes-products' && action_Will_Be_Done=='delete')
    {
      this.action_Will_Be_Done=action_Will_Be_Done;
      this.dataServ.getperfumesImages().subscribe(data=>{
        for (const key in data) {
          if(item.id==data[key].id){
            this.dataServ.delete("perfumesImages",key);
            this.firestorage.storage.refFromURL(this.deletedObject.img!).delete()
            break;
          }
        }
      })
    }
  }


  // --------------------------------------------  upload photos -----------------------------------------

  // funcion to upload img file and get image url   ---- for perfumes carasoul -------
  async uploadCarasoul(event:any,type_of_data_in_part:string){
    this.type_of_data_in_part=type_of_data_in_part
    this.uploadingCarasoul="uploadingCarasoul";
    const file=event.target.files[0];
    if(file){
      const path=`ajyal/${new Date().getTime()}${file.name}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.CarasoulURL=url;
    }
    this.uploadingCarasoul="CarasoulUploaded";
  }
  // funcion to upload img file and get image url ---- for product -------
  async uploadImg(event:any,type_of_data_in_part:string){
    this.type_of_data_in_part=type_of_data_in_part
    this.uploadingImg="uploadingImg";
    const file=event.target.files[0];
    if(file){
      const path=`ajyal/${new Date().getTime()}${file.name}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.productURL=url;
    }
    this.uploadingImg="imgUploaded";
  }

}
