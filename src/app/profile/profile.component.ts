import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile',

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any ;
  Email:any;
  constructor( private router: Router ,private http: HttpClient,private sharedService: SharedServiceService,   ) { }
  fileToUpload: any;

imageurl:any= "http://localhost:5000/img/";
  onFileSelected(event: any) {
    this.fileToUpload = event.target.files.item(0);
  }

 uploadImage() {

  const formData = new FormData();
  if(this.fileToUpload){
  formData.append('file', this.fileToUpload);



  this.http.post<any>('http://127.0.0.1:5000/api/upload', formData).subscribe(
    (response) => {
      console.log (response)
      // Assuming the response contains the filename of the saved image
      this.user.image = response.filename;
      this.updateUser();
    },
    (error) => {
      console.error('Error uploading image:', error);
    }
  );
  }else       this.updateUser();


}


  ngOnInit(): void {
    this.getDoctors();
  }

 async getDoctors() {
  try {
    this.Email = localStorage.getItem('key');
    const response = await this.http.get<any[]>('http://127.0.0.1:5000/api/user/getUserByEmail/' + this.Email).toPromise();
    this.user = response;
    console.log("this is the data in search component", this.user);
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
}

 updateUser() {

console.log("This is user in update function", this.user);
  this.http.put<any>('http://127.0.0.1:5000/api/user/'+this.user._id, this.user)
      .subscribe(
        (response) => {
          console.log('user  successfully:', response);
              Swal.fire('Thank you...', 'You submitted succesfully!', 'success')

    this.router.navigate([this.router.url]);
        },
        (error) => {

          console.error('Error adding appointment:', error);
        }
      );}


      setloc() {
      }



  getFileExtension(filename: string): string {
    return filename.split('.').pop() || ''; // Get the last part after the last dot
  }









      }



