import { HttpClient } from '@angular/common/http';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-doctor-deatils',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './doctor-deatils.component.html',
  styleUrl: './doctor-deatils.component.css'
})
export class DoctorDeatilsComponent {
sharedDatas: any;
  formData: any = {};
   appointmentDate: string = '';
  appointmentTime: string = '';
  constructor(private http: HttpClient,private sharedService: SharedServiceService, private toasterService: ToasterService,       private router: Router ) {

  }


  ngOnInit(): void {
      console.log(this.sharedService.getSharedVariable());

   this.sharedDatas = this.sharedService.getSharedVariable()
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

}
