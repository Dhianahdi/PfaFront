import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
formData: any = {};

  constructor(private http: HttpClient,private router: Router) { }

  onSubmit() {
    // Retrieve longitude and latitude from local storage
    const longitude = localStorage.getItem('longitude');
    const latitude = localStorage.getItem('latitude');

    // Assuming this.formData contains other form data
    this.formData.longitude = longitude;
    this.formData.latitude = latitude;
console.log("Form Data",this.formData);
    this.http.post('http://127.0.0.1:5000/api/user/login', this.formData)
      .subscribe(
        (response: any) => {
          localStorage.setItem('key', this.formData.email);
          console.log('this.formData.email: ', this.formData.email);
          localStorage.setItem('token', response.token);
          console.log('response.token: ', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('isVerified', response.isVerified);
          console.log(' response.isVerified: ',  response.isVerified);
          console.log('response.role: ', response.role);
          console.log('Signup added successfully:', response);
          if (response.role == "patient") {
          this.router.navigate(['search']);

          } 
          if (response.role == "doctor") {
          this.router.navigate(['appointment']);

          }
          if (response.role == "admin"){
            this.router.navigate(['doctor-list']);
          }
        },
        (error) => {
          alert('Verifier les parametres');
          console.error('Error adding signup:', error);
          // Handle error here if needed
        }
      );
  }



}
