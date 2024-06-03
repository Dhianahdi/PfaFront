import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = localStorage.getItem('role');
    const isVerified = JSON.parse(localStorage.getItem('isVerified') || 'false');
    console.log('isVerified: ', isVerified);

    if (!role || !isVerified) {
      this.router.navigate(['/error-page']);
      return false;
    }

    const expectedRole = route.data['expectedRole'];
    if (expectedRole && role !== expectedRole) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

  isDoctor(): boolean {
    const role = localStorage.getItem('role');
    if (role === 'doctor') {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

  isPatient(): boolean {
    const role = localStorage.getItem('role');
    if (role === 'patient') {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
