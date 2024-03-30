import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DocAvailableComponent } from './doc-available/doc-available.component';
import { DocScheduleComponent } from './doc-schedule/doc-schedule.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Appointment', component: AppointmentComponent },
  { path: 'DocAvailable', component: DocAvailableComponent },
  { path: 'DocSchedule', component: DocScheduleComponent },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
