import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements  OnInit {
    appoint: any ;

  constructor(private http: HttpClient,       private router: Router ) {
  }
ngOnInit(): void {
  const patientEmail: any = localStorage.getItem('key');

  this.http.get<any[]>('http://127.0.0.1:5000/api/appointment/getAppointmentsByUserEmail/' + patientEmail)
    .pipe(
      map((response: any[]) => {
                console.log (response);

        return response.map(appointment => {
          const dateTime = new Date(appointment.dateTime);
          return {
            ...appointment,
            date: this.formatDate(dateTime),
            time: this.formatTime(dateTime)
          };
        });
      })
    )
    .subscribe(
      (appointments) => {
        console.log (appointments);
        this.appoint = appointments;
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
}
formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

formatTime(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}



}
