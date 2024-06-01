import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import Swal from 'sweetalert2';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-specialities-crud',
  standalone: true,
  imports: [CommonModule,FormsModule,MatDialogModule,MatButtonModule,MatIconModule,MatFormFieldModule,MatInputModule,MatOptionModule,MatSelectModule],
  templateUrl: './specialities-crud.component.html',
  styleUrl: './specialities-crud.component.css'
})
export class SpecialitiesCrudComponent implements OnInit{
  formData: any = {};
  specialities: any[] = [];
selectedSpecialty: string = '';
  constructor(
    private http: HttpClient,
    private _dialogRef : MatDialogRef<SpecialitiesCrudComponent>,
        private _coreService : CoreService,
    @Inject(MAT_DIALOG_DATA) public data :any
  ) { }

    ngOnInit(): void {
      console.log(this.data)
    this.getSpecialities(); // appel de la méthode pour récupérer les données des médecins lors de l'initialisation du composant
    this.formData = { ...this.data };
    //console.log(this.specialities)
  }

    getSpecialities() {
    this.http.get<any[]>('http://localhost:5000/api/specialities')
      .subscribe(
        (response) => {
          //console.log('response: ', response);

          this.specialities = response; // stocke les données des médecins dans la propriété doctors du composant
          console.log('response: ', response);
        },
        (error) => {
          console.error('Erreur lors de la récupération des spécialités:', error);
        }
      );
  }

  onFormSubmit() {
    if (this.data){

          this.http.put('http://localhost:5000/api/specialities/' + this.data._id , this.formData)
      .subscribe(
        (response: any) => {
                  this._coreService.openSnackBar('Doctor Data Edited Successfully', 'Done !');
          this._dialogRef.close(true);
          //this.router.navigate(['/login']);
        },
        (error) => {
          alert("Verifier les parametres");
          console.error('Error adding signup:', error);
          // Handle error here if needed
        }
      );

    } else {
    this.formData.role = "doctor";
    console.log(this.formData)
    

    this.http.post('http://127.0.0.1:5000/api/specialities', this.formData)
      .subscribe(

        (response:any) => {


          console.log('signup added successfully:', response);
                  this._coreService.openSnackBar('Speciality Added Successfully', 'Done !');
          this._dialogRef.close(true);
         // this.router.navigate(['/Transport']);
        },
        (error) => {
                    alert("Verifier les parametres");

          console.error('Error adding signup:', error);
          // Handle error here if needed
        }
      );}
  }

}
