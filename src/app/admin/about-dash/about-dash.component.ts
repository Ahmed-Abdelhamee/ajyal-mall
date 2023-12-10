import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-about-dash',
  templateUrl: './about-dash.component.html',
  // adding a css file to a component => Keep in mind that the URL should be relative to the component folder.
  styleUrls: ['./about-dash.component.scss',"../z-admin-style/admin-style.css"]
})
export class AboutDashComponent implements OnInit {
  datalist: any[] = [];
  CarasoulAboutURL: string = "";
  // for controlling view and adata
  Basic_part_of_control: string = "";
  action_Will_Be_Done: string = "";
  type_of_data_in_part: string = "";
  uploading: string = "";
  // for update
  updateObject: any;
  // for check delete
  deletedObject: any;
  // for popup deleted item show
  showDeleteDiv:boolean=false;
  // for adding data
  homeImg=this.fb.group({
    img:[""],
    id:[new Date().getTime()]
  })
  About=this.fb.group({
    title:["",],
    paragraph:["",Validators.required],
    id:[new Date().getTime()]
  })

  constructor(private route:Router,private fb:FormBuilder ,private auth:AdminAuthService  , private dataServ:DataService , private http:HttpClient, private firestorage:AngularFireStorage) { 
  }

  ngOnInit(): void {
    this.openPart('table data','carsouel','');
  }
 // ----------------------------- open the view for data special control -----------------------------
 openPart(part:string,type:string,action:string){
    this.Basic_part_of_control=part;
    this.type_of_data_in_part=type;
    this.action_Will_Be_Done=action;
    // delete texts and old data
    this.uploading=""
    this.showDeleteDiv=false
    if(part=="table data"){
      this.showdata(type);
    }
  }
  EmptyFormInputs(){
    this.About.patchValue({
      title:"",
      paragraph:""
    })
  }
  // ----------------------------- Carasoul function for About -----------------------------
  sendCarasoulAbout(){
    this.homeImg.patchValue({
      img:this.CarasoulAboutURL
    })
    if( this.action_Will_Be_Done =="add"){
        this.dataServ.create(this.homeImg.value,"AboutCarasoul","add");
      }
      else if(this.type_of_data_in_part=="carsouel" && this.action_Will_Be_Done =="edit"){
            this.dataServ.getAboutCarsoul().subscribe(data=>{
              for (const key in data) {
                if(this.updateObject.id==data[key].id){
                  this.homeImg.patchValue({
                    id:Number(this.updateObject.id)
              })
              this.dataServ.create(this.homeImg.value,"AboutCarasoul",key);
              break;
            }
          }
        })
      }
    this.uploading="null";
  }
  // ----------------------------- Data function for About -----------------------------
  sendAboutData(){
    if(this.About.valid){
      if(this.action_Will_Be_Done =="add")
      {
        this.dataServ.create(this.About.value,"AboutContent","add")
      }
      else if(this.type_of_data_in_part=="content" && this.action_Will_Be_Done =="edit"){
            this.dataServ.getAboutContent().subscribe(data=>{
              for (const key in data) {
                if(this.updateObject.id==data[key].id){
                  this.dataServ.create(this.About.value,"AboutContent",key);
                  break;
            }
          }
        })
      }
    }
  }
  //----------------------------- for view the data in table -----------------------------
  showdata(type:string){
    this.datalist=[]
    if(type=="carsouel" && this.datalist.length==0){
      this.dataServ.getAboutCarsoul().subscribe(data=>{
        for (const key in data) {
          this.datalist.push(data[key])
        }
      })
    }else  if(type=="content" && this.datalist.length==0){
      this.dataServ.getAboutContent().subscribe(data=>{
        for (const key in data) {
          this.datalist.push(data[key])
        }
      })
    }
  }
  // ----------------------------- update part -----------------------------
  update(item:any,action_Will_Be_Done:string){
    this.updateObject=item;
    if(this.type_of_data_in_part=='carsouel' && action_Will_Be_Done=='edit')
      {
        this.action_Will_Be_Done=action_Will_Be_Done
      } else if(this.type_of_data_in_part=='content' && action_Will_Be_Done=='edit')
      {
        this.About.patchValue({
          title:item.title,
          paragraph:item.paragraph,
          id:item.id,
        })
        this.action_Will_Be_Done=action_Will_Be_Done
      }
  }

  // ----------------------------- delete part -----------------------------
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
    this.deletedObject=item;
    // ----------- delete carasoul -----------
    if(this.type_of_data_in_part=='carsouel' && action_Will_Be_Done=='delete') {
      this.action_Will_Be_Done=action_Will_Be_Done;
      this.dataServ.getAboutCarsoul().subscribe(data=>{
        for (const key in data) {
          if(item.id==data[key].id){
            this.dataServ.delete("AboutCarasoul",key);
            break;
          }
        }
      })
    // ----------- delete content -----------
    } else if(this.type_of_data_in_part=='content' && action_Will_Be_Done=='delete'){
      this.action_Will_Be_Done=action_Will_Be_Done;
      this.dataServ.getAboutContent().subscribe(data=>{
        for (const key in data) {
          if(item.id==data[key].id){
            this.dataServ.delete("AboutContent",key);
            break;
          }
        }
      })
    }
  }
  // -------------- funcion to upload img file and get image url ---- for About Product --------------
  async uploadAboutCarasoul(event:any){
    this.uploading="uploadingAboutCarasoul";
    const file=event.target.files[0];
    if(file){
      const path=`ajyal/${file.name}${new Date().getTime()}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.CarasoulAboutURL=url;
    }
    this.uploading="uploadedAboutCarasoul";
  }
}
