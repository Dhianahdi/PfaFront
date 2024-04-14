import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog'; // Importez MatDialog
import { CommonModule } from '@angular/common';
import { DoctorAddEditComponent } from '../doctor-add-edit/doctor-add-edit.component';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatToolbarModule} from '@angular/material/toolbar';
import Swal from 'sweetalert2';
import { CoreService } from '../core/core.service';


@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule,MatToolbarModule,MatButtonModule,MatIconModule,MatTableModule,MatPaginatorModule,
  MatSortModule,MatInputModule,MatFormFieldModule,MatSnackBarModule],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'],

})
export class DoctorListComponent implements OnInit {
  formData: any = {};
  doctors: any[] = []; // tableau pour stocker les données des médecins
  
  displayedColumns: string[] = ['prenom', 'nom', 'email', 'telephone', 'Speciality', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient,
    private _dialog: MatDialog,
    private _coreService : CoreService
  ) { } // Injectez MatDialog ici

  ngOnInit(): void {
    this.getDoctors(); // appel de la méthode pour récupérer les données des médecins lors de l'initialisation du composant
    //console.log(this.doctors)
  }


   alertWithSuccess(){
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
    confirmBox(){

    
  }



  deleteDoctor(id : number){

        Swal.fire({
      title: 'Are you sure want to remove this Dr ?',
      text: 'You will not be able to recover this Dr !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete !',
      cancelButtonText: 'No, keep'
    }).then((result) => {
      if (result.value) {
             this.http.delete('http://localhost:5000/api/user/' + id)
      .subscribe(
        (response: any) => {
          console.log('Doctor Deleted !!', response);
          this.getDoctors();
          //this.successMessage = true; // Définir la variable successMessage à true en cas de succès
        },
        (error) => {
          alert("Verifier les parametres");
          console.error('Error adding signup:', error);
          // Handle error here if needed
        }
      );
        this._coreService.openSnackBar('Dr deleted successfully!', 'Done !');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
  })



  }




  getDoctors() {
    this.http.get<any[]>('http://localhost:5000/api/user/getAllDoctors')
      .subscribe(
        (response) => {
          //console.log('response: ', response);

          this.dataSource = new MatTableDataSource(response); // stocke les données des médecins dans la propriété doctors du composant
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator
        },
        (error) => {
          console.error('Erreur lors de la récupération des données des médecins:', error);
        }
      );
  }
    openAddEditdoctorForm(){
    const dialogRef = this._dialog.open(DoctorAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next : (val) => {
        if (val){
          this.getDoctors();
        }
      }
    })
  }
  
  
  openEditdoctorForm(data: any){
     const dialogRef = this._dialog.open(DoctorAddEditComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe({
      next : (val) => {
        if (val){
          this.getDoctors();
        }
      }
    })
  }


}