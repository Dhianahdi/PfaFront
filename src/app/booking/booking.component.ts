import { HttpClient } from '@angular/common/http';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-booking',

  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit{
 sharedDatas: any;
  formData: any = {};
   appointmentDate: string = '';
  appointmentTime: string = '';
errorMessage:any ='';
  constructor(private dialog: MatDialog,private http: HttpClient,private sharedService: SharedServiceService,       private router: Router ) {

  }


  ngOnInit(): void {
      console.log(this.sharedService.getSharedVariable());

   this.sharedDatas = this.sharedService.getSharedVariable()
  }



  addAppointment() {
    const patientEmail = localStorage.getItem('key');

    const dateTimeString = `${this.appointmentDate}T${this.appointmentTime}:00`;
    console.log(dateTimeString);
    console.log(patientEmail);
const appointmentData = {
  dateTime: dateTimeString,
  patientEmail: patientEmail,
doctorId: this.sharedDatas._id,

};    console.log(appointmentData);

    this.http.post<any>('http://127.0.0.1:5000/api/appointment/addAppointment', appointmentData)
      .subscribe(
        (response) => {
          console.log('Appointment added successfully:', response);
this.router.navigate(['/listappointment']);
        },
        (error) => {
          this.errorMessage = 'Error occurred while saving appointment.';

          console.error('Error adding appointment:', error);
        }
      );
  }



}

