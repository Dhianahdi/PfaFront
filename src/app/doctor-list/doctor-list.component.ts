import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'],

})
export class DoctorListComponent implements OnInit {
  doctors: any[] = []; // tableau pour stocker les données des médecins

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getDoctors(); // appel de la méthode pour récupérer les données des médecins lors de l'initialisation du composant
  }

  getDoctors() {
    this.http.get<any[]>('http://localhost:5000/api/user/getAllDoctors') // remplacez 'URL_VERS_VOTRE_API' par l'URL de votre API pour récupérer les données des médecins
      .subscribe(
        (response) => {
          this.doctors = response; // stocke les données des médecins dans la propriété doctors du composant
        },
        (error) => {
          console.error('Erreur lors de la récupération des données des médecins:', error);
        }
      );
  }
}
