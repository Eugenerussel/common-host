import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { log } from 'node:console';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'host-app';
  role:string='';
  username:string='';
  isClaimsOpen = false;
  isEnrollmentOpen = false;
  isCallCenterOpen = false;
  currentUrl: string = '';
  allowedClaimsRoles: string[] = ['Insitz Plus Admin', 'Customer Leadership', 'BPaaS Leadership', 'BPaaS Manager', 'BPaas Leads', 'BPaas Claims Analyst']; 
  allowedEnrollmentRoles: string[] = ['Insitz Plus Admin', 'Customer Leadership', 'BPaaS Leadership', 'BPaaS Manager', 'BPaas Leads', 'BPaas Enrollment Analyst']; 
  allowedCallCenterRoles: string[] = ['Insitz Plus Admin', 'Customer Leadership', 'BPaaS Leadership', 'BPaaS Manager']; 
  constructor(private router: Router) {
  }
  ngOnInit() {
    if (!localStorage.getItem('role')) {
      localStorage.setItem('role', 'Insitz Plus Admin');
    }
    if (!localStorage.getItem('username')) {
      localStorage.setItem('username', 'Steve');
    }
    this.role = localStorage.getItem('role') || '';
    this.username = localStorage.getItem('username') || '';
    console.log('Role: ', this.role);
    console.log('Username: ', this.username);
    
    this.currentUrl = this.router.url; // Set initial URL

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url; // Update on route change
      }
    });
  }
  
  logout() {
    localStorage.clear();
    this.router.navigate(['/']); // Redirect to login page after logout
  }
  

  toggleClaimsMenu() {
    this.isClaimsOpen = !this.isClaimsOpen;
  }
  toggleEnrollmentMenu(){
    this.isEnrollmentOpen = !this.isEnrollmentOpen;
  }
  toggleCallCenterMenu(){
    this.isCallCenterOpen = !this.isCallCenterOpen;
  }
  canAccessClaims(): boolean {
    return this.allowedClaimsRoles.includes(this.role.trim()); // Trim to remove spaces
  }
  canAccessEnrollment(): boolean {
    return this.allowedEnrollmentRoles.includes(this.role.trim()); // Trim to remove spaces
  }
  canAccessCallCenter(): boolean {
    return this.allowedCallCenterRoles.includes(this.role.trim()); // Trim to remove spaces
  }
 
}
