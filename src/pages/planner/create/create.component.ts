import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DateService } from '../../../utilities/date.service';
import { Event, PlannerService } from '../../planner/planner-storage.service';
import { PlannerDashboard } from '../../planner/planner.dashboard.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  providers: [PlannerService, DateService]
})
export class CreateComponent implements OnInit {
  event: Event = <Event>{};
  constructor(public navCtrl: NavController, public navParams: NavParams, private plannerService: PlannerService, private dateService: DateService) { }

  ngOnInit() {
  }

  createEvent() {
    this.event.createdDate = this.dateService.getTodaysDate();
    this.event.id = "Event" + Date.now();

    this.plannerService.addEvent(this.event).then(item => {
      this.event = <Event>{};
      this.navCtrl.push(PlannerDashboard);
    });
  }
}