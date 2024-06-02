import { HttpClient } from '@angular/common/http';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent  implements  OnInit{
    appointmentList: any;
filteredAppointments: any;

 sharedDatas: any;
  formData: any = {};
   appointmentDate: string = '';
  appointmentTime: string = '';
errorMessage:any ='';
  user: any ;
  Email:any;
  constructor(private dialog: MatDialog,private http: HttpClient,private sharedService: SharedServiceService,       private router: Router ) {

  }
getAppointments() {
  this.Email = localStorage.getItem('key');
  console.log(this.Email);

  const url = "http://127.0.0.1:5000/api/appointment/getAppointmentsBydoctorEmail/" + this.Email;
  this.http.get<any[]>(url).subscribe(
    (appointments) => {
      this.appointmentList = appointments.map(appointment => {
        return {appointment, date: appointment.dateTime.split('T')[0], time: appointment.dateTime.split('T')[1].split('.')[0] };
      });
       this.filteredAppointments = this.appointmentList;
      console.log(this.appointmentList);
    },
    (error) => {
      console.error('Erreur lors de la récupération des rendez-vous:', error);
      this.appointmentList = [];
    }
  );
}
  getAppointmentsfilter() {
           this.appointmentList = this.filteredAppointments;

   if (this.appointmentDate) {
                console.log(this.appointmentDate)

    this.appointmentList = this.appointmentList.filter((appointment: any) => {
      console.log(appointment)
      const appointmentDate = appointment.date;
                console.log(appointmentDate)

      return appointmentDate === this.appointmentDate;
    });
  } else {
    this.filteredAppointments = this.appointmentList;
  }
  }
   async getDoctors() {
  try {
    this.Email = localStorage.getItem('key');
    const response = await this.http.get<any[]>('http://127.0.0.1:5000/api/user/getUserByEmail/' + this.Email).toPromise();
    this.user = response;



    console.log("this is the data in search component", this.user);
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
}
  ngOnInit(): void {
    this.getAppointments()
    this.getDoctors()
  }

      navigateAppointements(){
          this.router.navigate(['/appointment']);
    }
    navigateDocAvailable(){
          this.router.navigate(['/DocAvailable']);
    }
    navigatequestions(){
          this.router.navigate(['/questions']);
    }
    navigatepatientslist(){
          this.router.navigate(['/patientslist']);
    }

    navigateprofile(){
          this.router.navigate(['/Doctorprofile']);
    }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }


}
