import { HttpClient } from '@angular/common/http';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  reservedAppointments: string[] = [];
  appointmentList: string[] = [];
  sharedDatas: any;
  formData: any = {};
  appointmentDate: string = '';
  appointmentTime: string = '';
  errorMessage: any = '';

  constructor(private dialog: MatDialog, private http: HttpClient, private sharedService: SharedServiceService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    const Id = localStorage.getItem("shared");
    console.log(Id);
    this.getusertById1();
  }

  async getusertById1() {
    try {
      const Id = localStorage.getItem("shared");
      const response = await this.http.get<any>('http://127.0.0.1:5000/api/user/' + Id).toPromise();
      this.sharedDatas = response;
    } catch (error) {
      console.error('Error fetching Circuit data:', error);
    }
  }

  getReservedAppointments() {
    if (this.appointmentDate) {
      const url = `http://127.0.0.1:5000/api/appointment/getReservedAppointments/${this.sharedDatas._id}/${this.appointmentDate}`;
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

  addAppointment() {
    const patientEmail = localStorage.getItem('key');
    const appid = localStorage.getItem('rdv');
    if (appid) {
      this.deleteAppointment(appid);
      localStorage.removeItem('rdv');
    }

    const today = new Date();
    const selectedDate = new Date(this.appointmentDate);
    const selectedTime = parseInt(this.appointmentTime.split(':')[0], 10);
    const currentTime = today.getHours();

    if (selectedDate < today) {
      this.errorMessage = 'Invalid date: Please select a date equal to or after today.';
      this.toastr.error(this.errorMessage);
      return;
    }

    if (selectedTime < 8 || selectedTime > 17) {
      this.errorMessage = 'Invalid time: Please select a time between 8:00 AM and 5:00 PM.';
      this.toastr.error(this.errorMessage);
      return;
    }

    if ((selectedDate.getTime() === today.getTime()) && (selectedTime <= currentTime)) {
      this.errorMessage = 'Invalid time: Please select a time later than the current time.';
      this.toastr.error(this.errorMessage);
      return;
    }

    const dateTimeString = `${this.appointmentDate}T${this.appointmentTime}:00`;
    const appointmentData = {
      dateTime: dateTimeString,
      patientEmail: patientEmail,
      doctorId: this.sharedDatas._id,
    };

    this.http.post<any>('http://127.0.0.1:5000/api/appointment/addAppointment', appointmentData)
      .subscribe(
        (response) => {
          console.log('Appointment added successfully:', response);
          this.errorMessage = '';
          this.toastr.success('Appointment added successfully');

          // Update the reserved appointments
          this.getReservedAppointments();
        },
        (error) => {
          this.errorMessage = 'This time is reserved.';
          this.toastr.error(this.errorMessage);
          console.error('Error adding appointment:', error);
        }
      );
  }

  deleteAppointment(appointmentId: string): void {
    const apiUrl = `http://127.0.0.1:5000/api/appointment/${appointmentId}`;
    this.http.delete(apiUrl)
      .subscribe(
        (response) => {
          console.log('Appointment deleted successfully:', response);
        },
        (error) => {
          console.error('Error deleting appointment:', error);
        }
      );
  }
}
