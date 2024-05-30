import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-doc-available',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './doc-available.component.html',
  styleUrl: './doc-available.component.css'
})
export class DocAvailableComponent implements OnInit{
  user: any ;
  Email:any;
    startTime: string = '';
  endTime: string = '';
  constructor( private router: Router ,private http: HttpClient,private sharedService: SharedServiceService,   ) { }
  fileToUpload: any;

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
        console.log("this is the data in search component", this.startTime);

    console.log("this is the data in search component", this.user);
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
}

 updateUsertime() {

console.log("This is user in update function", this.user);
  this.http.put<any>('http://127.0.0.1:5000/api/user/'+this.user._id, this.user)
      .subscribe(
        (response) => {
          console.log('user  successfully:', response);
              Swal.fire('Thank you...', 'You submitted succesfully!', 'success')

    this.router.navigate([this.router.url]);
        },
        (error) => {

          console.error('Error adding appointment:', error);
        }
      );}


  onSubmit() {
    const formData = {
      startTime: this.startTime,
      endTime: this.endTime
    };

    this.http.put<any>('http://127.0.0.1:5000/api/availability/editNormalDays/'+this.user.availability, formData)
      .subscribe(
        (response) => {
          console.log('Slot updated successfully:', response);
Swal.fire({
  icon: "success",
  title: "updated successfully",
  showConfirmButton: false,
  timer: 1500
});          this.startTime = '';
          this.endTime = '';
        },
        (error) => {
          console.error('Error updating slot:', error);
        }
      );
  }

}
