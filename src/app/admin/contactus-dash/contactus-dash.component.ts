import { Component, OnInit } from '@angular/core';
import { sendFeedback } from 'src/app/interfaces/feedback.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contactus-dash',
  templateUrl: './contactus-dash.component.html',
  styleUrls: ['./contactus-dash.component.scss']
})
export class ContactusDashComponent implements OnInit {


  feedback:sendFeedback[]=[]

  constructor(private dataSrv:DataService) {
    dataSrv.getFeedback().subscribe(data =>{
      for (const key in data) {
        this.feedback.push(data[key])
      }
    })
   }

  ngOnInit(): void {
  }
}
