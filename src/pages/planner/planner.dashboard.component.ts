import { Component } from '@angular/core';
import { ActionSheetController, NavController, NavParams, Platform } from 'ionic-angular';
import { DateService } from '../../utilities/date.service';
import { Event, PlannerService } from '../planner/planner-storage.service';
import { CreateComponent } from './create/create.component';

@Component({
  templateUrl: 'planner.dashboard.component.html',
  styles: ['custom-calendar{height: auto !important; } ion-col{padding:0px;}'],
  providers: [PlannerService, DateService]
})
export class PlannerDashboard {
  dailyEvents: Event[] = [];
  events: Event[] = [];
  selectedDay = new Date()
  selectedObject
  eventSource = []
  viewTitle;
  isToday: boolean;
  currDate = new Date();
  calendarModes = [
    { key: 'month', value: 'Month' },
    { key: 'week', value: 'Week' },
    { key: 'day', value: 'Day' },
  ]
  calendar = {
    mode: this.calendarModes[0].key,
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, private actionSheetCtrl: ActionSheetController, private plannerService: PlannerService, private plt: Platform, private navParams: NavParams, private dateService: DateService) {
    this.plt.ready().then(() => {
      this.loadEvents();
    });
  }

  loadEvents() {
    this.plannerService.getEvents().then(events => {
      if (events != null) {
        this.dailyEvents = events.filter((item: Event) => (item.eventType != null && item.eventType == "Daily") && (this.currDate == null || (this.dateService.getDateInFormat(this.currDate) == item.eventDate.toString())));
        this.events = events.filter((item: Event) => (item.eventType != null && item.eventType == "Event") && (this.currDate == null || (this.dateService.getDateInFormat(this.currDate) == item.eventDate.toString())));
      }
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }
  changeMode(mode) {
    this.calendar.mode = mode;
  }
  today() {
    this.calendar.currentDate = new Date();
  }
  onTimeSelected(ev) {
    this.currDate = new Date(ev.SelectedTime);
  }
  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();

    this.selectedDay = event;

  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return (date < current);
  };

  openActionSheet(event) {
    console.log('opening');
    let actionsheet = this.actionSheetCtrl.create({
      title: "Choose Option",
      buttons: [
        {
          text: 'Block Date',
          handler: () => {
            console.log("Block Date Clicked: ", event);
            let d = event.selectedTime;
            //d.setHours(0, 0, 0);
            setTimeout(() => {
              this.blockDayEvent(d)
            }, 2);
          }
        },
        {
          text: 'Meet Up With',
          handler: function () {
            console.log("Meet Up With Clicked");
          }
        }
      ]
    }); actionsheet.present();
  }

  blockDayEvent(date) {
    let startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

    let endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

    let events = this.eventSource;
    events.push({
      title: 'All Day ',
      startTime: startTime,
      endTime: endTime,
      allDay: true
    });
    this.eventSource = [];
    setTimeout(() => {
      this.eventSource = events;
    });
  }

  addEvent() {
    this.navCtrl.push(CreateComponent);
  }

  onOptionSelected($event: any) {
    console.log($event)
    //this.calendar.mode = $event
  }

}