import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog'; // Importez MatDialog
import { CommonModule } from '@angular/common';
import { SpecialitiesCrudComponent } from '../specialities-crud/specialities-crud.component';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import Swal from 'sweetalert2';
import { CoreService } from '../core/core.service';


@Component({
  selector: 'app-specialities-list',
  standalone: true,
  imports: [RouterOutlet,CommonModule,MatToolbarModule,MatButtonModule,MatIconModule,MatTableModule,MatPaginatorModule,
  MatSortModule,MatInputModule,MatFormFieldModule,MatSnackBarModule],
  templateUrl: './specialities-list.component.html',
  styleUrl: './specialities-list.component.css'

})
export class SpecialitiesListComponent implements OnInit {
  formData: any = {};
  specialities: any[] = []; // tableau pour stocker les données des médecins
  
  displayedColumns: string[] = ['name', 'description', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient,
    private _dialog: MatDialog,
    private _coreService : CoreService,
    private router : Router
  ) { } // Injectez MatDialog ici

  ngOnInit(): void {
    this.getSpecialities(); // appel de la méthode pour récupérer les données des médecins lors de l'initialisation du composant
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



  deleteSpecility(id : number){

        Swal.fire({
      title: 'Are you sure want to remove this Speciality ?',
      text: 'You will not be able to recover this Speciality !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete !',
      cancelButtonText: 'No, keep'
    }).then((result) => {
      if (result.value) {
             this.http.delete('http://localhost:5000/api/specialities/' + id)
      .subscribe(
        (response: any) => {
          console.log('Speciality Deleted !!', response);
          this.getSpecialities();
          //this.successMessage = true; // Définir la variable successMessage à true en cas de succès
        },
        (error) => {
          alert("Verifier les parametres");
          console.error('Error adding signup:', error);
          // Handle error here if needed
        }
      );
        this._coreService.openSnackBar('Speciality deleted successfully!', 'Done !');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
  })



  }




  getSpecialities() {
    this.http.get<any[]>('http://localhost:5000/api/specialities')
      .subscribe(
        (response) => {
          //console.log('response: ', response);

          this.dataSource = new MatTableDataSource(response); // stocke les données des specialités dans la propriété doctors du composant
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator
        },
        (error) => {
          console.error('Erreur lors de la récupération des données des specialités:', error);
        }
      );
  }
    openAddSpecialityForm(){
    const dialogRef = this._dialog.open(SpecialitiesCrudComponent);
    dialogRef.afterClosed().subscribe({
      next : (val) => {
        if (val){
          this.getSpecialities();
        }
      }
    })
  }
      navigateDoctors(){
          this.router.navigate(['/doctor-list']);
    }

    navigateSpecialities(){
          this.router.navigate(['/specialities-list']);
    }
  
  
  openEditSpecialityForm(data: any){
     const dialogRef = this._dialog.open(SpecialitiesCrudComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe({
      next : (val) => {
        if (val){
          this.getSpecialities();
        }
      }
    })
  }


}