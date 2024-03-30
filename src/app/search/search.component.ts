import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  doctors: any ;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors() {
    this.http.get<any[]>('http://127.0.0.1:5000/api/user/getAllDoctors')
      .subscribe(
        (response) => {
          this.doctors = response;
          console.log (this.doctors);
          console.log (this.doctors[0].Specialty);
        },
        (error) => {
          console.error('Error fetching doctors:', error);
        }
      );
  }
}
