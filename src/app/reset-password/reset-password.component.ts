import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {NgAlertBoxComponent} from "ng-alert-box-popup";

@Component({
  selector: 'app-reset-password',
  standalone : true,
  imports: [FormsModule,CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  
})
export class ResetPasswordComponent {
  formData: any = {};
  successMessage: boolean = false;
  passwordsMatch: boolean = true; // Variable pour contrôler l'affichage du message de succès
  
  constructor(private http: HttpClient,private router: Router) { }

  onSubmit() {
    // Vérification de correspondance des mots de passe ici
    if (this.formData.newPassword !== this.formData.confirmPassword) {
      this.passwordsMatch = false;
      return;
    }
    this.passwordsMatch = true;
    this.http.patch('http://localhost:5000/api/user/reset/Password', this.formData)
      .subscribe(
        (response: any) => {
          console.log('Email Sent', response);
          this.successMessage = true;
          //this.router.navigate(['/login']);
        },
        (error) => {
          alert("Verifier les parametres");
          console.error('Error adding signup:', error);
          // Handle error here if needed
        }
      );
  };
}
