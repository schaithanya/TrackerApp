import { Component, OnInit } from '@angular/core';
import{ IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlannerService, Event} from '../../planner/planner-storage.service';
import { PlannerDashboard } from '../../planner/planner.dashboard.component';
import { DateService } from '../../../utilities/date.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  providers:[PlannerService, DateService]     
})
export class CreateComponent implements OnInit {  
  event: Event = <Event>{};
  constructor(public navCtrl: NavController, public navParams: NavParams, private plannerService: PlannerService, private dateService: DateService) { }

  ngOnInit() {
  } 

  createEvent(){
    this.event.createdDate = this.dateService.getTodaysDate(); 
    this.event.id = "Event" + Date.now();

    this.plannerService.addEvent(this.event).then(item => {
      this.event = <Event>{};
      this.navCtrl.push(PlannerDashboard);
    });    
  }  
}