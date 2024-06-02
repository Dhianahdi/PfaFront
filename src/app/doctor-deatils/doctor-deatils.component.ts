import { HttpClient } from '@angular/common/http';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { CoreService } from '../core/core.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor-deatils',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './doctor-deatils.component.html',
  styleUrl: './doctor-deatils.component.css'
})
export class DoctorDeatilsComponent {

sharedDatas: any;
termsAccepted: any;
questionText: string = '' ;
   appointmentDate: string = '';
  appointmentTime: string = '';
  constructor(private http: HttpClient,private sharedService: SharedServiceService, private toastr: ToastrService,  private _coreService: CoreService    ,private router: Router ) {

  }


  ngOnInit(): void {
this.getusertById()

  }
  async getusertById() {
    try {
    const Id=localStorage.getItem("shared");
    const response = await this.http.get<any>('http://127.0.0.1:5000/api/user/' +  Id).toPromise();
      this.sharedDatas=response
    } catch (error) {
    console.error('Error fetching Circuit data:', error);
  }
  }
 async getusertById1(Id: string) {
  try {
    const response = await this.http.get<any>('http://127.0.0.1:5000/api/user/' +  Id).toPromise();
    this.sharedService.setSharedVariable(response);
    this.router.navigate(['/booking']);
  } catch (error) {
    console.error('Error fetching Circuit data:', error);
  }
  }


  submitQuestion(): void {
    if (this.questionText == "")
    {
          this.toastr.error('Question is NULL');
return
  }

    const payload = {
      userEmail: localStorage.getItem('key'), // Replace with actual user email
      doctorEmail: this.sharedDatas.email, // Replace with actual doctor email
      questionText: this.questionText
    };

    this.http.post('http://127.0.0.1:5000/api/questions/add', payload)
      .subscribe(
        () => {
    this.toastr.success('Question added successfully');
this.questionText = ""
        },
        error => {
              this.toastr.error('Error adding question!');

        }
      );
  }
}


