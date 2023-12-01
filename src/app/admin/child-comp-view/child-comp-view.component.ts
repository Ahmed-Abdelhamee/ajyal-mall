import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-child-comp-view',
  templateUrl: './child-comp-view.component.html',
  styleUrls: ['./child-comp-view.component.scss',"../z-admin-style/admin-style.css"]
})
export class ChildCompViewComponent implements OnInit , OnChanges {

  datalist:any[]=[];
  parttext:string="";
  @Input() data:string="";

  constructor(private route:Router,private fb:FormBuilder , private dataServ:DataService , private http:HttpClient, private firestorage:AngularFireStorage) { }
  
  ngOnChanges(): void {
    this.parttext=`the show of ${this.data}`
    this.datalist=[];
    this.datalist=[];
      this.dataServ.getData(this.data).subscribe(data=>{
        for (const key in data) {
          this.datalist.push(data[key])
        }
    })
  }

  ngOnInit(): void {
    
  }


}
