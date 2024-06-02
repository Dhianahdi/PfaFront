import { HttpClient } from '@angular/common/http';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-email-verified',
  standalone: true,
  imports: [],
  templateUrl: './email-verified.component.html',
  styleUrl: './email-verified.component.css'
})
export class EmailVerifiedComponent  implements OnInit {

  constructor(private dialog: MatDialog,private http: HttpClient,private sharedService: SharedServiceService,      private toastr: ToastrService,  private router: Router ) {}
  
  ngOnInit(): void {
  }

      navigateLogin(){
          this.router.navigate(['/login']);
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

