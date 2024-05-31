import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';
@Component({
  selector: 'app-layoutuser',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layoutuser.component.html',
  styleUrl: './layoutuser.component.css'
})
export class LayoutuserComponent implements OnInit{
  constructor(private dialog: MatDialog, private http: HttpClient, private sharedService: SharedServiceService, private router: Router) {
  }
 user: any ;
  Email:any;
   async getDoctors() {
  try {
    this.Email = localStorage.getItem('key');
    const response = await this.http.get<any[]>('http://127.0.0.1:5000/api/user/getUserByEmail/' + this.Email).toPromise();
    this.user = response;



    console.log("this is the data in search component", this.user);
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
}
  ngOnInit(): void {
    this.getDoctors()
  }
}
