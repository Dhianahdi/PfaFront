import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  doctors: any ;
  doctors1:any;
      specialties: string[] = [];

 userLongitude1:any= localStorage.getItem('longitude');
 userLongitude= parseFloat(this.userLongitude1)
userLatitude1:any=localStorage.getItem('latitude');
 userLatitude= parseFloat(this.userLatitude1)

  constructor( private router: Router ,private http: HttpClient,private sharedService: SharedServiceService,   ) { }

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    console.log('role: ', role);
     this.http.get<any[]>('http://127.0.0.1:5000/api/specialities')
            .subscribe(
                (response) => {
          this.specialties = response.map((specialty: any) => specialty.name);
          console.log('this.specialties: ', this.specialties);
                    console.log (this.specialties);
                },
                (error) => {
                    console.error('Error fetching specialties:', error);
                }
            );
    this.getDoctors();
  }

 getDoctors() {

    this.http.get<any[]>('http://127.0.0.1:5000/api/user/getAllDoctors')
      .subscribe(
        (response) => {
                    console.log("Les médecins  par distance:", response);

          // Calculer la distance entre l'utilisateur et chaque médecin
          response.forEach(doctor => {
                                console.log("Les médecins  par distance:", doctor.geolocalisation.longitude);

            doctor.distance = this.calculateDistance(this.userLongitude, this.userLatitude, doctor.geolocalisation.longitude, doctor.geolocalisation.latitude);
          });

          // Trier les médecins en fonction de leur distance
          this.doctors = response.sort((a, b) => a.distance - b.distance);
          this.doctors1 = response.sort((a, b) => a.distance - b.distance);

          console.log("Les médecins triés par distance:", this.doctors);
        },
        (error) => {
          console.error('Erreur lors de la récupération des médecins:', error);
        }
      );
  }

  private calculateDistance(lon1: number, lat1: number, lon2: number, lat2: number) {
    console.log('lat2: ', lat2);
    console.log('lon2: ', lon2);
    console.log('lat1: ', lat1);
    console.log('lon1: ', lon1);
    // Par exemple, la formule de la distance euclidienne
    return Math.sqrt(Math.pow(lon2 - lon1, 2) + Math.pow(lat2 - lat1, 2));
  }
  async getusertById(Id: string) {
    localStorage.setItem('shared', Id);
    this.router.navigate(['/booking']);

  }

  async getusertById1(Id: string) {
  console.log ("L'ID est : ", Id);
    localStorage.setItem('shared', Id);
    this.router.navigate(['/DoctorDeatils']);

}
filterFunction(doctor: any, selectedSpecialists: string[]): boolean {
  if(doctor.Specialty)
{console.log(doctor.Specialty)
  return selectedSpecialists.includes(doctor.Specialty.name);

}else{
  return false;
}
}

filterBySpecialist() {
    this.doctors =this.doctors1

  const selectedSpecialists = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="select_specialist"]:checked')).map((checkbox: HTMLInputElement) => checkbox.value);
    console.log('selectedSpecialists : ', selectedSpecialists);
if(selectedSpecialists.length>0){
  this.doctors = this.doctors.filter((doctor: any) => this.filterFunction(doctor, selectedSpecialists));
  console.log('Filtré : ', this.doctors);
}else {
  this.doctors =this.doctors1
}

}

}
