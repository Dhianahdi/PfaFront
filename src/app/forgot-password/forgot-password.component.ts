import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone : true,
  imports: [FormsModule,CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  
})
export class ForgotPasswordComponent {
  formData: any = {};
  successMessage: boolean = false; // Variable pour contrôler l'affichage du message de succès
  
  constructor(private http: HttpClient,private router: Router) { }

  onSubmit() {
    console.log("test");

    this.http.get('http://localhost:5000/api/user/request/resetPassword/' + this.formData.email)
      .subscribe(
        (response: any) => {
          console.log('Email Sent', response);
          this.successMessage = true; // Définir la variable successMessage à true en cas de succès
        },
        (error) => {
          alert("Verifier les parametres");
          console.error('Error adding signup:', error);
          // Handle error here if needed
        }
      );
  }
}
