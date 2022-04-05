import { Injectable } from "@angular/core";

@Injectable()
export class DateService {

  public getTodaysDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }

  public getWeekDates() {
    let now = new Date();
    let dayOfWeek = now.getDay(); //0-6
    let numDay = now.getDate();

    let start = new Date(now); //copy
    start.setDate((numDay - dayOfWeek) + 1);
    start.setHours(0, 0, 0, 0);


    let end = new Date(now); //copy
    end.setDate(numDay + (7 - dayOfWeek));
    end.setHours(0, 0, 0, 0);

    return [start, end];
  }

  public getDateInFormat(date: Date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    
    return yyyy + '-' + mm + '-' + dd;
  }
}
