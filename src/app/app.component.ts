import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements  OnInit{
  title = 'PfaFront';
  auth:any;
   ngOnInit(){

this.auth =localStorage.getItem("key");
      console.log( this.auth);

    navigator.geolocation.getCurrentPosition((position)=>{
      //console.log( position.coords);
      localStorage.setItem("latitude", String(position.coords.latitude));
      localStorage.setItem("longitude", String(position.coords.longitude));
    })
  }
}
