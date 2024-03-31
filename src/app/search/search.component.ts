import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  doctors: any ;

  constructor( private router: Router ,private http: HttpClient,private sharedService: SharedServiceService,   ) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors() {
    this.http.get<any[]>('http://127.0.0.1:5000/api/user/getAllDoctors')
      .subscribe(
        (response) => {
          this.doctors = response;

        },
        (error) => {
          console.error('Error fetching doctors:', error);
        }
      );
  }
  async getusertById(Id: string) {
  try {
    const response = await this.http.get<any>('http://127.0.0.1:5000/api/user/' +  Id).toPromise();
    this.sharedService.setSharedVariable(response);
    this.router.navigate(['/booking']);
  } catch (error) {
    console.error('Error fetching Circuit data:', error);
  }
}
}
