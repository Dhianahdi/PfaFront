import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  sharedVariableSubject :any; // Initialiser comme Subject

  sharedData1: any;
  id: any;
  token: any;

  updateToken(data: any) {
    this.token = data;
    console.log(this.token);
  }

  updateSharedData(data: any) {
    this.sharedData1 = data;
    console.log(this.sharedData1);
    // Diffuser les données mises à jour via le Subject
    this.sharedVariableSubject.next(data);
  }

  // Retourne un Observable pour les mises à jour de sharedVariableSubject
  getSharedVariable() {
    return this.sharedData1;
  }

  // Met à jour les données partagées
  setSharedVariable(data: any) {
    this.sharedData1=data;
  }
}
