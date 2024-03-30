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



    console.log('signup added successfully:', this.formData);

    this.http.post('http://127.0.0.1:5000/api/user/login', this.formData)
      .subscribe(

        (response:any) => {
          localStorage.setItem('key', this.formData.email);

        localStorage.setItem('token', response.token)

          console.log('signup added successfully:', response);
         this.router.navigate(['/search']);
        },
        (error) => {
                    alert("Verifier les parametres");

          console.error('Error adding signup:', error);
          // Handle error here if needed
        }
      );
  }



}
