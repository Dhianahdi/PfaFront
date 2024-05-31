import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements  OnInit{
  title = 'PfaFront';
   ngOnInit(){


    navigator.geolocation.getCurrentPosition((position)=>{
localStorage.setItem("latitude", String(position.coords.latitude));
localStorage.setItem("longitude", String(position.coords.longitude));


    })
  }
}
