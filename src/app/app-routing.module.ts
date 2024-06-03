import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DocAvailableComponent } from './doc-available/doc-available.component';
import { BookingComponent } from './booking/booking.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DoctorDeatilsComponent } from './doctor-deatils/doctor-deatils.component';
import { ListComponent } from './booking/list/list.component';
import { ProfileComponent } from './profile/profile.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { LayoutuserComponent } from './layoutuser/layoutuser.component';
import { LayoutDocComponent } from './layout-doc/layout-doc.component';
import { SpecialitiesListComponent } from './specialities-list/specialities-list.component';
import { RecordsComponent } from './records/records.component';
import { PatientslistComponent } from './patientslist/patientslist.component';
import { SpecialitiesDeatilsComponent } from './specialities-deatils/specialities-deatils.component';
import { QuestRepComponent } from './quest-rep/quest-rep.component';
import { AuthGuardService } from './auth-gard.service';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
      { path: 'error-page', component: ErrorPageComponent },
  { path: '', component: LayoutComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'email-verified', component: EmailVerifiedComponent },
  ]
},
{ path: 'doctor-list', component: DoctorListComponent, canActivate: [AuthGuardService], data: { expectedRole: 'admin' } },   
{ path: 'specialities-list', component: SpecialitiesListComponent, canActivate: [AuthGuardService], data: { expectedRole: 'admin' } },
{ path: 'dashboard-admin', component: DashboardAdminComponent, canActivate: [AuthGuardService], data: { expectedRole: 'admin' } },
{ path: '', component: LayoutuserComponent, children: [
  { path: 'search', component: SearchComponent, canActivate: [AuthGuardService], data: { expectedRole: 'patient' } },
  { path: 'listappointment', component: ListComponent, canActivate: [AuthGuardService], data: { expectedRole: 'patient' } },
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuardService], data: { expectedRole: 'patient' } },
  { path: 'DoctorDeatils', component: DoctorDeatilsComponent, canActivate: [AuthGuardService], data: { expectedRole: 'patient' } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService], data: { expectedRole: 'patient' } },
]},
{ path: '', component: LayoutDocComponent, children: [
  { path: 'appointment', component: AppointmentComponent, canActivate: [AuthGuardService], data: { expectedRole: 'doctor' } },
  { path: 'DocAvailable', component: DocAvailableComponent, canActivate: [AuthGuardService], data: { expectedRole: 'doctor' } },
  { path: 'Doctorprofile', component: ProfileComponent, canActivate: [AuthGuardService], data: { expectedRole: 'doctor' } },
  { path: 'records', component: RecordsComponent, canActivate: [AuthGuardService], data: { expectedRole: 'doctor' } },
  { path: 'patientslist', component: PatientslistComponent, canActivate: [AuthGuardService], data: { expectedRole: 'doctor' } },
  { path: 'specialities', component: SpecialitiesDeatilsComponent, canActivate: [AuthGuardService], data: { expectedRole: 'doctor' } },
  { path: 'questions', component: QuestRepComponent },
]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
