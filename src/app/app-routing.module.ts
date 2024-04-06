import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DocAvailableComponent } from './doc-available/doc-available.component';
import { DocScheduleComponent } from './doc-schedule/doc-schedule.component';
import { BookingComponent } from './booking/booking.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DoctorDeatilsComponent } from './doctor-deatils/doctor-deatils.component';
import { ListComponent } from './booking/list/list.component';
import { ProfileComponent } from './profile/profile.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutuserComponent } from './layoutuser/layoutuser.component';
import { LayoutDocComponent } from './layout-doc/layout-doc.component';

const routes: Routes = [
    { path: '', component: LayoutComponent, children: [
    { path: '', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  ]},
     { path: '', component: LayoutuserComponent, children: [
  { path: 'search', component: SearchComponent },
    { path: 'listappointment', component: ListComponent },
      { path: 'booking', component: BookingComponent },
  { path: 'DoctorDeatils', component: DoctorDeatilsComponent },


  ]},

  { path: '', component: LayoutDocComponent, children: [
  { path: 'appointment', component: AppointmentComponent },
  { path: 'DocAvailable', component: DocAvailableComponent },
  { path: 'DocSchedule', component: DocScheduleComponent },
  { path: 'Doctorprofile', component: ProfileComponent },


  ]},




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
