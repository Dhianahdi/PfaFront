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
  reservedAppointments: string[] = [];
    appointmentList: string[] = [];

 sharedDatas: any;
  formData: any = {};
   appointmentDate: string = '';
  appointmentTime: string = '';
errorMessage:any ='';
  constructor(private dialog: MatDialog,private http: HttpClient,private sharedService: SharedServiceService,       private router: Router ) {

  }
 getReservedAppointments() {
    if (this.appointmentDate) {
      const url = "http://127.0.0.1:5000/api/appointment/getReservedAppointments/"+this.sharedDatas._id+"/"+this.appointmentDate;
      this.http.get<any[]>(url).subscribe(
       (appointments) => {
      this.appointmentList = appointments.map(appointment => {
        const date = new Date(appointment.dateTime);
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return time;
      });
    },
        (error) => {
          console.error('Erreur lors de la récupération des rendez-vous:', error);
          this.appointmentList = [];
        }
      );
    }
  }

  ngOnInit(): void {
      console.log(this.sharedService.getSharedVariable());

   this.sharedDatas = this.sharedService.getSharedVariable()
  }


addAppointment() {
  const patientEmail = localStorage.getItem('key');
  const today = new Date();
  const selectedDate = new Date(this.appointmentDate);
  const selectedTime = parseInt(this.appointmentTime.split(':')[0], 10);
  const currentTime = today.getHours(); // Heure locale actuelle

  // Vérification que la date est supérieure ou égale à la date actuelle
  if (selectedDate < today) {
    // Date invalide
     this.errorMessage =('Invalid date: Please select a date equal to or after today.');
    return;
  }

  // Vérification que l'heure est valide (entre 8h00 et 17h00)
  if (selectedTime < 8 || selectedTime > 17) {
    // Heure invalide
    this.errorMessage =('Invalid time: Please select a time between 8:00 AM and 5:00 PM.');
    return;
  }

  // Vérification que l'heure sélectionnée est postérieure à l'heure locale actuelle
  if (selectedTime <= currentTime) {
    // Heure invalide
     this.errorMessage =('Invalid time: Please select a time later than the current time.');
    return;
  }

  const dateTimeString = `${this.appointmentDate}T${this.appointmentTime}:00`;
  console.log(dateTimeString);
  console.log(patientEmail);
  const appointmentData = {
    dateTime: dateTimeString,
    patientEmail: patientEmail,
    doctorId: this.sharedDatas._id,
  };

  console.log(appointmentData);

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

