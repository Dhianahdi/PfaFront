import { HttpClient } from '@angular/common/http';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-quest-rep',

  templateUrl: './quest-rep.component.html',
  styleUrl: './quest-rep.component.css'
})
export class QuestRepComponent implements OnInit {
   user: any ;
  Email:any;
  fileToUpload: any;
  responseText: string="";
  questions: any[] = [];
imageurl:any= "http://localhost:5000/img/";
constructor(private dialog: MatDialog,private http: HttpClient,private sharedService: SharedServiceService,      private toastr: ToastrService,  private router: Router ) {

  }

  ngOnInit(): void {
    this.getDoctors();
    this.getQuestionsByDoctorEmail();
  }
async getQuestionsByDoctorEmail() {
  try {
           this.Email = localStorage.getItem('key');

      const response = await this.http.get<any[]>('http://127.0.0.1:5000/api/questions/doctor/' + this.Email).toPromise();
    if (response) {

      this.questions = response.map(question => {
        const createdAtDate = new Date(question.createdAt);
        const now = new Date();
        const timeDifference = Math.abs(now.getTime() - createdAtDate.getTime());
        const minutesDifference = Math.ceil(timeDifference / (1000 * 60));


        // Convert time difference to days
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
        // Assign daysDifference to a property in the question object
        question.timeDifferenceInDays = daysDifference;
        return {
          id: question._id,
          userName: question.userId.prenom,
          userImage: 'http://localhost:5000/img/' + question.userId.image,
          questionText: question.questionText,
          createdAt: question.createdAt,
          responseText: question.responseText,
          timeDifference: daysDifference // Add time difference in minutes
        };
      });


    } else {
      console.error('Empty response received from server.');
      // Handle the case where response is empty
    }
    } catch (error) {
    console.error('Error fetching questions by doctor email:', error);
    // Handle error appropriately, e.g., display an error message
  }
}
 async getDoctors() {
  try {
    this.Email = localStorage.getItem('key');
    const response = await this.http.get<any[]>('http://127.0.0.1:5000/api/user/getUserByEmail/' + this.Email).toPromise();
    this.user = response;
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
  }

  updateQuestion(questionId: string): void {
    if (this.responseText == '') {
      this.toastr.error("Message Null")
      return;
  }
    // Make PUT request to update the question with the response
    this.http.put<any>(`http://127.0.0.1:5000/api/questions/${questionId}`, { "responseText":this.responseText}).subscribe(
      () => {
        // Reload the page upon successful update
        location.reload();
      },
      error => {
        console.error('Error updating question:', error);
        // Handle error appropriately, e.g., display an error message
      }
    );
  }
}
