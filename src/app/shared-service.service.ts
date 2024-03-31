import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
   sharedVariableSubject: any;
  sharedData1: any;
  token: any;

  updatetoken(data: any) {
    this.token = data;
    console.log( this.token)
  }
  updateSharedData(data: any) {
    this.sharedData1 = data;
    console.log( this.sharedData1)
  }

  // Observable to subscribe to for the response data
  getSharedVariable() {


    return this.sharedVariableSubject;
  }

  // Update the sharedVariable with the response data
  setSharedVariable(data: any) {

    this.sharedVariableSubject=data;


  }
}
