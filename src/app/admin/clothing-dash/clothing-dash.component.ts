import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-clothing-dash',
  templateUrl: './clothing-dash.component.html',
  styleUrls: ['./clothing-dash.component.scss']
})
export class ClothingDashComponent implements OnInit {

  // data variables
  parttext:string="";
  productURL:string="";
  CarasoulURL:string="";
  datalist:any[]=[];
  databaseURL:any="";
  // variables for controll the view
  carsouelFormControl:string="";
  partViewController:string="";
  sectionViewController:string="";
  edit_control:string="";
  viewController:string="clothing";
  uploadingImg:string="null";
  uploadingCarasoul:string="null";
  // for check update
  updateObject:any;
  // for check delete
  deletedObject: any;
  // for popup deleted item show
  showDeleteDiv:boolean=false;
  // for adding 
  clothingImg=this.fb.group({
    img:[""],
    url:[""],
    id:[new Date().getTime()]
  })

  constructor(private route:Router,private fb:FormBuilder , private dataServ:DataService , private http:HttpClient, private firestorage:AngularFireStorage) { 
    if(sessionStorage.getItem("Admin")!="AdminisTrue"){
      route.navigate(["/admin/dash-login"])
    }
  }

  ngOnInit(): void {
    this.openPart('table data','clothing-carsouel','')
  }


// ------------------------------------- send data to add to database -----------------------------------
  
  // ------------- Carasoul function for clothing -----------------
  sendCarasoul(edit_control:string,sectionViewController:string){
    this.clothingImg.patchValue({
      img:this.CarasoulURL,
    })
    // add carasoul
    if(edit_control=="clothing-carsouel" && sectionViewController =="add")
    {
      this.dataServ.create(this.clothingImg.value,"clothingCarasoul","add");
    }
    // edit carasoul
    else if(edit_control=="clothing-carsouel" && sectionViewController =="edit"){
      this.dataServ.getclothingCarasoul().subscribe(data=>{
        for (const key in data) {
          if(this.updateObject.id==data[key].id){
            this.clothingImg.patchValue({
              id:Number(this.updateObject.id)
            })
            this.dataServ.create(this.clothingImg.value,"clothingCarasoul",key);
            break;
          }
        }
      })
    }
    this.uploadingCarasoul="null";
  }
  // ------------- product function for clothing -----------------
  sendProducts(edit_control:string,sectionViewController:string){
    this.clothingImg.patchValue({
      img:this.productURL
    })
    if(edit_control=="clothing-products" && sectionViewController =="add"){
      this.dataServ.create(this.clothingImg.value,"clothingImages","add");
    }
    else if(edit_control=="clothing-products" && sectionViewController =="edit"){
      this.dataServ.getclothingImages().subscribe(data=>{
        this.clothingImg.patchValue({
          id:Number(this.updateObject.id)
        })
        // code for if there is no change for one of product elements
        if(this.clothingImg.get("img")?.value==""){
          this.clothingImg.patchValue({
            img:this.updateObject.img
          })
        }else if(this.clothingImg.get("url")?.value==""){
          this.clothingImg.patchValue({
            url:this.updateObject.url
          })
        }
        for (const key in data) {
          if(this.updateObject.id==data[key].id){
            this.dataServ.create(this.clothingImg.value,"clothingImages",key);
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
    this.partViewController=part;
    this.sectionViewController=action;
    this.carsouelFormControl=action;
    this.edit_control=type;
    // delete texts and old data
    this.uploadingCarasoul=""
    this.uploadingImg=""
    this.showDeleteDiv=false
    if(part=="table data"){
      this.showdata(type);
    }
    this.clothingImg.patchValue({
      url:""
    })
  }

  // ------------------------------------ show data table -------------------------------------
  showdata(type:string){
    this.datalist=[]
    this.edit_control=type;
    if(type=="clothing-carsouel"){
      this.dataServ.getclothingCarasoul().subscribe(data=>{
        for (const key in data) {
          this.datalist.push(data[key])
        }
      })
    }else  if(type=="clothing-products"){
      this.dataServ.getclothingImages().subscribe(data=>{
        for (const key in data) {
          this.datalist.push(data[key])
        }
      })
    }
  }

  // --------------------------------------- update part ---------------------------------------
  update(item:any,sectionViewController:string){
    this.updateObject=item;
    if(this.edit_control=='clothing-carsouel' && sectionViewController=='edit')
      {
        this.sectionViewController=sectionViewController
      } else if(this.edit_control=='clothing-products' && sectionViewController=='edit')
      {
        this.clothingImg.patchValue({
          url:this.updateObject.url
        })
        this.sectionViewController=sectionViewController
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
  deleteItem(item:any,sectionViewController:string){
    //----------- delete carasoul -----------
    if(this.edit_control=='clothing-carsouel' && sectionViewController=='delete')
    {
      this.sectionViewController=sectionViewController;
      this.dataServ.getclothingCarasoul().subscribe(data=>{
        for (const key in data) {
          if(item.id==data[key].id){
            this.dataServ.delete("clothingCarasoul",key);
            break;
          }
        }
      })
      // ----------- delete content -----------
    } else if(this.edit_control=='clothing-products' && sectionViewController=='delete')
    {
      this.sectionViewController=sectionViewController;
      this.dataServ.getclothingImages().subscribe(data=>{
        for (const key in data) {
          if(item.id==data[key].id){
            this.dataServ.delete("clothingImages",key);
            break;
          }
        }
      })
    }
  }


  // --------------------------------------------  upload photos -----------------------------------------

  // funcion to upload img file and get image url   ---- for clothing carasoul -------
  async uploadCarasoul(event:any,edit_control:string){
    this.edit_control=edit_control
    this.uploadingCarasoul="uploadingCarasoul";
    const file=event.target.files[0];
    if(file){
      const path=`alBairaq/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.CarasoulURL=url;
    }
    this.uploadingCarasoul="CarasoulUploaded";
  }
  // funcion to upload img file and get image url ---- for product -------
  async uploadImg(event:any,edit_control:string){
    this.edit_control=edit_control
    this.uploadingImg="uploadingImg";
    const file=event.target.files[0];
    if(file){
      const path=`alBairaq/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.productURL=url;
    }
    this.uploadingImg="imgUploaded";
  }


}
