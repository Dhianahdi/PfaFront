import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-email-verified',
  standalone: true,
  imports: [],
  templateUrl: './email-verified.component.html',
  styleUrls: ['./email-verified.component.css']
})
export class EmailVerifiedComponent implements OnInit {
  email: string ='';
  token: string='';

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
   this.verifyEmail()
  }

  async verifyEmail(): Promise<void> {
    const response = await this.http.get<any>(`http://localhost:5000/api/EmailVerification/verify-user`)
    .subscribe(

    (response) => {
      
        // Logique en cas de succès
        Swal.fire('Your Email is Verified !', 'You can LogIn now', 'success')
        //this.toastr.success('Email vérifié avec succès');
      },
      (error)  => {
        // Logique en cas d'erreur
        console.error('Erreur lors de la vérification de l\'email:', error);
        this.toastr.error('Erreur lors de la vérification de l\'email');
      
    }
  )
  }

  navigateLogin() {
    this.router.navigate(['/login']);
  }

  navigateAppointments() {
    this.router.navigate(['/appointment']);
  }

  navigateDocAvailable() {
    this.router.navigate(['/DocAvailable']);
  }

  navigateQuestions() {
    this.router.navigate(['/questions']);
  }

  navigatePatientsList() {
    this.router.navigate(['/patientslist']);
  }

  navigateProfile() {
    this.router.navigate(['/Doctorprofile']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
