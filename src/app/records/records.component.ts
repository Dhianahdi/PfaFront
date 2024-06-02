import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-records',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent implements OnInit{


  constructor( private router: Router ,private http: HttpClient,private sharedService: SharedServiceService   ) { }
Patient: any;
desc:String=''
desc1:String=''
id:any;

    ngOnInit(): void {
this.id=this.sharedService.id
      this.Patient = this.sharedService.sharedData1
      console.log(this.Patient);
this.sharedService.sharedData1=this.Patient

    }


        openMedicalRecordModal( medicalRecord:any) {

          this.desc=medicalRecord.remark
            }



 onSubmit() {


    this.http.post('http://127.0.0.1:5000/api/medicalRecord/add-remark/'+ this.Patient.patient._id,{ doctorId: this.id, remark:this.desc1})
      .subscribe(
        (response: any) => {
    this.router.navigate([this.router.url]);
        },
        (error) => {
          console.error('Error :', error);
        }
      );
  }






}


