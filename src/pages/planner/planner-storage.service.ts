import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const Storage_Key = 'planner';

export interface Event{
  id: string,
  eventType : any,
  eventTitle : string,
  eventNotes : string,
  eventPlace : string,
  eventDate: Date,
  createdDate: string
}

@Injectable()
export class PlannerService
{
constructor(private storage: Storage){            
  }

  public async getEvents(): Promise<Event[]>{    
    return await this.storage.get(Storage_Key);
  }

  public addEvent(newEvent: Event)
  {
    return this.getEvents().then((results: Event[]) => {
      if(results)
      {
        results.push(newEvent);
        return this.storage.set(Storage_Key, results);
      }
      else
      {
        return this.storage.set(Storage_Key, [newEvent]);
      }
    });    
  }

  public async removeEvent(eventId: string){
    return this.getEvents().then((results: Event[])  => {     
      if(!results || results.length == 0){
        return null;
      }

      let newItems: Event[] = [];
      for(let result of results){
        if(result.id !== eventId){
          newItems.push(result);
        }
      }

      return this.storage.set(Storage_Key, newItems);   
    });
  }      

  public async updateEvent(event: Event)
  {
    return this.getEvents().then((results: Event[]) => {
      if(!results || results.length == 0){
        return null;
      }

      let newItems: Event[] = [];

      for(let result of results){
        if(result.id == event.id){
          newItems.push(event);          
        }
        else{
          newItems.push(result);
        }
      }
      return this.storage.set(Storage_Key, newItems);
    });
  }  
}