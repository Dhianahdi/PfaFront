import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-patientslist',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './patientslist.component.html',
  styleUrl: './patientslist.component.css'
})
export class PatientslistComponent implements OnInit{
  user: any ;
  Email:any;
    startTime: string = '';
  endTime: string = '';
  constructor( private router: Router ,private http: HttpClient,private sharedService: SharedServiceService,   ) { }
  fileToUpload: any;
Patients: any;
imageurl:any= "http://localhost:5000/img/";
  onFileSelected(event: any) {
    this.fileToUpload = event.target.files.item(0);
  }
    ngOnInit(): void {
      this.getDoctors();


  }


   async getDoctors() {
  try {
    this.Email = localStorage.getItem('key');
    const response = await this.http.get<any[]>('http://127.0.0.1:5000/api/user/getUserByEmail/' + this.Email).toPromise();
    this.user = response;

    this.startTime=this.user.availability.normalDays.startTime
                this. getpatients();

  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
}

 async getpatients() {

  this.http.get<any>('http://127.0.0.1:5000/api/medicalRecord/doctor-patients/'+this.user._id)
      .subscribe(
        (response) => {
          console.log('************:', response);
          this.Patients=response
        },
        (error) => {

          console.error('Error adding appointment:', error);
        }
      );}

      setpatients( patient:any) {
        console.log(patient);
            localStorage.setItem('shared', this.user._id);

        patient.medicalHistory= patient.medicalHistory[this.user._id].remarks
        this.sharedService.sharedData1=patient
        this.sharedService.id=this.user._id
    this.router.navigate(['/records']);
            }




}

