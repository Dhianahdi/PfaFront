import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.css'
})
export class LayoutAdminComponent implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateActiveClass(event.urlAfterRedirects);
      }
    });

    // Initial update based on the current URL
    this.updateActiveClass(this.router.url);
  }

  updateActiveClass(currentPath: string) {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === currentPath) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
    navigateDoctors(){
          this.router.navigate(['/doctor-list']);
    }

    navigateSpecialities(){
          this.router.navigate(['/specialities-list']);
    }


}
