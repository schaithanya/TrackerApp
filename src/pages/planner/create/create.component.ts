import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import moment from 'moment'
import { of } from "rxjs/observable/of";

@Component({
  templateUrl: 'create.component.html',
})
export class CreateComponent {

  event = {
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    allDay: false,
    room : {}
  };
  minDate = new Date().toISOString();
  rooms$ = of([{ id: "room1", name: "room1" }, { id: "room2", name: "room2" }, { id: "room3", name: "room3" }])

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    public viewCtrl: ViewController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.viewCtrl.dismiss(this.event);
  }

  blockDay($event) {
    console.log($event)
  }

  optionSelected($event) {
    console.log($event)
    this.event.room = $event
  }
}