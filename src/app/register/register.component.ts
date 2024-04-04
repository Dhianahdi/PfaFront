import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
formData: any = {};

  constructor(private http: HttpClient,private router: Router) { }

onSubmit() {



    console.log('signup added successfully:', this.formData);

    this.http.post('http://127.0.0.1:5000/api/user/signup', this.formData)
      .subscribe(

        (response:any) => {


          console.log('signup added successfully:', response);
         // this.router.navigate(['/Transport']);
         this.router.navigate(['/login']);
        },
        (error) => {
                    alert("Verifier les parametres");

          console.error('Error adding signup:', error);
          // Handle error here if needed
        }
      );
    
    }
}
