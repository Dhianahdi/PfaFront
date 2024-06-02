import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import Swal from 'sweetalert2';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-doctor-add-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './doctor-add-edit.component.html',
  styleUrls: ['./doctor-add-edit.component.css']
})
export class DoctorAddEditComponent implements OnInit {
  formData: any = {};
  specialities: any[] = [];
  selectedSpecialty: string = '';

  constructor(
    private http: HttpClient,
    private _dialogRef: MatDialogRef<DoctorAddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.getSpecialities(); // appel de la méthode pour récupérer les données des spécialités lors de l'initialisation du composant
    this.formData = { ...this.data };
  }

  getSpecialities() {
    this.http.get<any[]>('http://localhost:5000/api/specialities')
      .subscribe(
        (response) => {
          this.specialities = response; // stocke les données des spécialités dans la propriété specialities du composant
          console.log('response: ', response);
        },
        (error) => {
          console.error('Erreur lors de la récupération des spécialités:', error);
        }
      );
  }

  onFormSubmit() {
    if (this.data) {
      this.http.put('http://localhost:5000/api/user/' + this.data._id, this.formData)
        .subscribe(
          (response: any) => {
            this._coreService.openSnackBar('Doctor Data Edited Successfully', 'Done !');
            this._dialogRef.close(true);
          },
          (error) => {
            alert("Verifier les parametres");
            console.error('Error updating user:', error);
          }
        );
    } else {
      this.formData.role = "doctor";
      console.log('this.formData.spec: ', this.formData.Specialty);
      console.log(this.formData);

      this.http.post('http://127.0.0.1:5000/api/user/add-doctor', this.formData)
        .subscribe(
          (response: any) => {
            console.log('User added successfully:', response);
            this._coreService.openSnackBar('Doctor Added Successfully', 'Done !');
            this._dialogRef.close(true);
          },
          (error) => {
            alert("Verifier les parametres");
            console.error('Error adding user:', error);
          }
        );
    }
  }
}
