import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  sended:string="";

  constructor(private fb:FormBuilder, private dataSrv:DataService) { 
    if(sessionStorage.getItem("runCarsouel")!="contactReloaded"){
      sessionStorage.setItem("runCarsouel","contactReloaded")
      location.reload();
    }
  }

  ContactUS=this.fb.group({
    Fname:["",Validators.required],
    Lname:["",Validators.required],
    email:["",Validators.required],
    phone:["",Validators.required],
    msg:["",Validators.required],
    id:[`${new Date().getTime()}`]
  })

  ngOnInit(): void {
  }

  submit(){
    if(this.ContactUS.valid){
      this.dataSrv.sendFeedback(this.ContactUS.value);
      this.sended="your message sended successfully"
    }else{
      this.sended="please: fill all the form data"
    }
  }

}
