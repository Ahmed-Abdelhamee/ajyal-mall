import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cafes-dash',
  templateUrl: './cafes-dash.component.html',
  // adding a css file to a component => Keep in mind that the URL should be relative to the component folder.
  styleUrls: ['./cafes-dash.component.scss',"../z-admin-style/admin-style.css"]
})
export class CafesDashComponent implements OnInit {

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
  viewController:string="cafes";
  uploadingImg:string="null";
  uploadingCarasoul:string="null";
  // for check update
  updateObject:any;
  // for check delete
  deletedObject: any;
  // for popup deleted item show
  showDeleteDiv:boolean=false;
  // for adding 
  cafesImg=this.fb.group({
    img:[""],
    url:[""],
    id:[new Date().getTime()]
  })


  constructor(route:Router,private fb:FormBuilder , private dataServ:DataService , private firestorage:AngularFireStorage) { 
    if(sessionStorage.getItem("Admin")!="AdminisTrue"){
      route.navigate(["/admin/dash-login"])
    }
  }

  ngOnInit(): void {
    this.openPart('table data','cafes-carsouel','')
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
      this.cafesImg.patchValue({
        url:""
      })
    }
  
    // ------------------------------------ show data table -------------------------------------
    showdata(type:string){
      this.datalist=[]
      this.edit_control=type;
      if(type=="cafes-carsouel"){
        this.dataServ.getCafesCarsoul().subscribe(data=>{
          for (const key in data) {
            this.datalist.push(data[key])
          }
        })
      }else  if(type=="cafes-products"){
        this.dataServ.getCafesImages().subscribe(data=>{
          for (const key in data) {
            this.datalist.push(data[key])
          }
        })
      }
    }

// ------------------------------------- send data to add to database -----------------------------------
  
  // ------------- Carasoul function for cafes -----------------
  sendCarasoul(edit_control:string,sectionViewController:string){
    this.cafesImg.patchValue({
      img:this.CarasoulURL,
    })
    // add carasoul
    if(edit_control=="cafes-carsouel" && sectionViewController =="add")
    {
      this.dataServ.create(this.cafesImg.value,"cafesCarasoul","add");
    }
    // edit carasoul
    else if(edit_control=="cafes-carsouel" && sectionViewController =="edit"){
      this.dataServ.getCafesCarsoul().subscribe(data=>{
        for (const key in data) {
          if(this.updateObject.id==data[key].id){
            this.cafesImg.patchValue({
              id:Number(this.updateObject.id)
            })
            this.dataServ.create(this.cafesImg.value,"cafesCarasoul",key);
            break;
          }
        }
      })
    }
    this.uploadingCarasoul="null";
  }
  // ------------- product function for cafes -----------------
  sendProducts(edit_control:string,sectionViewController:string){
    this.cafesImg.patchValue({
      img:this.productURL
    })
    if(edit_control=="cafes-products" && sectionViewController =="add"){
      this.dataServ.create(this.cafesImg.value,"cafesImages","add");
    }
    else if(edit_control=="cafes-products" && sectionViewController =="edit"){
      this.dataServ.getCafesImages().subscribe(data=>{
        this.cafesImg.patchValue({
          id:Number(this.updateObject.id)
        })
        // code for if there is no change for one of product elements
        if(this.cafesImg.get("img")?.value==""){
          this.cafesImg.patchValue({
            img:this.updateObject.img
          })
        }else if(this.cafesImg.get("url")?.value==""){
          this.cafesImg.patchValue({
            url:this.updateObject.url
          })
        }
        for (const key in data) {
          if(this.updateObject.id==data[key].id){
            this.dataServ.create(this.cafesImg.value,"cafesImages",key);
            break;
          }
        }
      })
    }
    this.uploadingImg="null";
  }

  // --------------------------------------- update part ---------------------------------------
  update(item:any,sectionViewController:string){
    this.updateObject=item;
    if(this.edit_control=='cafes-carsouel' && sectionViewController=='edit')
      {
        this.sectionViewController=sectionViewController
      } else if(this.edit_control=='cafes-products' && sectionViewController=='edit')
      {
        this.cafesImg.patchValue({
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
    if(this.edit_control=='cafes-carsouel' && sectionViewController=='delete')
    {
      this.sectionViewController=sectionViewController;
      this.dataServ.getCafesCarsoul().subscribe(data=>{
        for (const key in data) {
          if(item.id==data[key].id){
            this.dataServ.delete("cafesCarasoul",key);
            break;
          }
        }
      })
      // ----------- delete content -----------
    } else if(this.edit_control=='cafes-products' && sectionViewController=='delete')
    {
      this.sectionViewController=sectionViewController;
      this.dataServ.getCafesImages().subscribe(data=>{
        for (const key in data) {
          if(item.id==data[key].id){
            this.dataServ.delete("cafesImages",key);
            break;
          }
        }
      })
    }
  }


  // --------------------------------------------  upload photos -----------------------------------------

  // funcion to upload img file and get image url   ---- for cafes carasoul -------
  async uploadCarasoul(event:any,edit_control:string){
    this.edit_control=edit_control
    this.uploadingCarasoul="uploadingCarasoul";
    const file=event.target.files[0];
    if(file){
      const path=`ajyal/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
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
      const path=`ajyal/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.productURL=url;
    }
    this.uploadingImg="imgUploaded";
  }

}
