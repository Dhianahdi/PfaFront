import { HttpClient } from '@angular/common/http';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit{
 sharedDatas: any;
  formData: any = {};

  constructor(private http: HttpClient,private sharedService: SharedServiceService,        private router: Router ) {

  }


  ngOnInit(): void {
      console.log(this.sharedService.getSharedVariable());

    // Subscribe to the Observable to get the response data
   this.sharedDatas = this.sharedService.getSharedVariable()
  }
}
