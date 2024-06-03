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
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [RouterOutlet,CommonModule,MatToolbarModule,MatButtonModule,MatIconModule,MatTableModule,MatPaginatorModule,
  MatSortModule,MatInputModule,MatFormFieldModule,MatSnackBarModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements OnInit {

    formData: any = {};
  specialities: any[] = []; // tableau pour stocker les données des médecins
      user: any;
    Email:any;

  constructor(private http: HttpClient,
    private _dialog: MatDialog,
    private _coreService : CoreService,
    private router : Router
  ) {}

  async ngOnInit(): Promise<void> {
    // this.getSpecialities(); // appel de la méthode pour récupérer les données des médecins lors de l'initialisation du composant
    //console.log(this.doctors)
    this.Email = localStorage.getItem('key');
      const response = await this.http.get<any[]>('http://127.0.0.1:5000/api/user/getUserByEmail/' + this.Email).toPromise();
      this.user = response;
  }

     navigateDoctors(){
          this.router.navigate(['/doctor-list']);
    }

    navigateSpecialities(){
          this.router.navigate(['/specialities-list']);
    }
    navigateDashboard(){
          this.router.navigate(['/dashboard-admin']);
    }
         logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}