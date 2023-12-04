import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sendFeedback } from 'src/app/interfaces/feedback.interface';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contactus-dash',
  templateUrl: './contactus-dash.component.html',
  // adding a css file to a component => Keep in mind that the URL should be relative to the component folder.
  styleUrls: ['./contactus-dash.component.scss',"../z-admin-style/admin-style.css"]
})
export class ContactusDashComponent implements OnInit {


  feedback:sendFeedback[]=[];
  del_ID:string="";

  constructor(private dataSrv:DataService ,private auth:AdminAuthService ,private route:Router) {
    if(sessionStorage.getItem("Admin")!=auth.AdminUserID){
      route.navigate(["/admin/dash-login"])
    }
    dataSrv.getFeedback().subscribe(data =>{
      for (const key in data) {
        this.feedback.push(data[key])
      }
    })
   }

  ngOnInit(): void {
  }

  del(item:any){
    this.dataSrv.getFeedback().subscribe(data =>{
      for (const key in data) {
        if(data[key].id==item.id){
          this.del_ID=data[key].id;
          this.dataSrv.delete("feedback",key);
          break;
        }
      }
    })
  }
}
