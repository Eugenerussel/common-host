import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Menu } from '../../model/menu';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-view-port',
  imports: [RouterOutlet,CommonModule,RouterModule,FormsModule],
  templateUrl: './view-port.component.html',
  styleUrl: './view-port.component.css'
})
export class ViewPortComponent {
//   title = 'host-app';
//   role:string='';
//   username:string='';
//   activeMenu: string | null = null;
//   currentUrl: string = '';
//   isDropdownOpen: boolean = false; 
//   searchQuery: string = '';
//   filteredItems: any[] = [];
//   //menuItems: Menu[] = [];
//   allowedClaimsRoles: string[] = ['Insitz Plus Admin', 'Customer Leadership', 'BPaaS Leadership', 'BPaaS Manager', 'BPaas Leads', 'BPaas Claims Analyst']; 
//   allowedEnrollmentRoles: string[] = ['Insitz Plus Admin', 'Customer Leadership', 'BPaaS Leadership', 'BPaaS Manager', 'BPaas Leads', 'BPaas Enrollment Analyst']; 
//   allowedCallCenterRoles: string[] = ['Insitz Plus Admin', 'Customer Leadership', 'BPaaS Leadership', 'BPaaS Manager']; 
//   constructor(private router: Router) {
//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         const url = event.urlAfterRedirects || event.url; // Handle redirected URLs
//         const match = url.match(/\/businessOperation.*/); // Match everything from 'businessOperation' onward
    
//         this.currentUrl = match ? match[0] : url; // Set extracted path or fallback to full URL
//       }
//     });
//   }
//   ngOnInit() {
//     if (!localStorage.getItem('role')) {
//       localStorage.setItem('role', 'Insitz Plus Admin');
//     }
//     if (!localStorage.getItem('username')) {
//       localStorage.setItem('username', 'Steve');
//     }
//     this.role = localStorage.getItem('role') || '';
//     this.username = localStorage.getItem('username') || '';
//     console.log('Role: ', this.role);
//     console.log('Username: ', this.username);
       
//   }
//   getInitials(name: string): string {
//     const names = name.split(' ');
//     const initials = names.map(name => name.charAt(0).toUpperCase()).join('');
//     return initials;
//   }
//   toggleDropdown() {
//     this.isDropdownOpen = !this.isDropdownOpen;
//   }
//   @HostListener('document:click', ['$event'])
//   closeDropdown(event: Event) {
//     if (!(event.target as HTMLElement).closest('.profile-dropdown')) {
//       this.isDropdownOpen = false;
//     }
//   }
  
//   logout() {
//     localStorage.clear();
//     this.router.navigate(['/']); // Redirect to login page after logout
//   }
  

//   toggleMenu(menuName: string) {
//     if (this.activeMenu === menuName) {
//       this.activeMenu = null; // Close if the same menu is clicked again
//     } else {
//       this.activeMenu = menuName; // Open the clicked menu and close others
//     }
//   }
//   canAccessClaims(): boolean {
//     return this.allowedClaimsRoles.includes(this.role.trim()); // Trim to remove spaces
//   }
//   canAccessEnrollment(): boolean {
//     return this.allowedEnrollmentRoles.includes(this.role.trim()); // Trim to remove spaces
//   }
//   canAccessCallCenter(): boolean {
//     return this.allowedCallCenterRoles.includes(this.role.trim()); // Trim to remove spaces
//   }

//   menuItems = [
//     {
//       name: 'claims',
//       label: 'Claims', 
//       submenus: [
//         { label: 'Production Report', link: '/businessOperation/claims/productionReport'},
//         { label: 'Pending Claims-New', link: '/businessOperation/claims/pendingClaimsNew'},
//         { label: 'Pending Claims-Adjusted', link: '/businessOperation/claims/pendingClaimsAdjusted'},
//         { label: 'Finalized Claims', link: '/businessOperation/claims/finalizedClaims'}
//       ]
//     },
//     {
//       name: 'enrollment',
//       label: 'Enrollment',
//       submenus: [
//         { label: 'Enrollment Aging', link: '/businessOperation/enrollment/enrollmentAging'},
//         { label: 'ID Card Aging', link: '/businessOperation/enrollment/idCardAging'},
//         { label: 'ID Card Status', link: '/businessOperation/enrollment/idCardStatus'},
//         { label: 'TAT-Enrollments', link: '/businessOperation/enrollment/tatEnrollments'}
//       ]
//     },
//     {
//       name: 'callCenter',
//       label: 'Call Center',
//       submenus: [
//         { label: 'Overall SLA', link: '/businessOperation/callCenter/overallSLA'},
//         { label: 'Team Details', link: '../teamDetails'}
//       ]
//     }
//   ];

//   filterMenu() {
//     if (!this.searchQuery.trim()) {
//       this.filteredItems = [];
//       return;
//     }
  
//     this.filteredItems = [];
  
//     this.menuItems.forEach(menu => {
//       // Check if parent menu matches search
//       if (menu.label.toLowerCase().includes(this.searchQuery.toLowerCase())) {
//         this.filteredItems.push({ label: menu.label, link: '' });
//       }
  
//       // Check if any submenu matches search
//       menu.submenus.forEach(sub => {
//         if (sub.label.toLowerCase().includes(this.searchQuery.toLowerCase())) {
//           this.filteredItems.push({ label: sub.label, link: sub.link });
//         }
//       });
//     });
//   }
  
//   clearSearch() {
//     this.searchQuery = '';
//     this.filteredItems = [];
//   }

// }
currentUrl: string = '';
role: string = '';
username: string = '';
isDropdownOpen: boolean = false;
activeMenu: string | null = null;
searchQuery: string = '';
filteredItems: any[] = [];
menuItems: any[] = [];
allowedRoles: any = {};

constructor(private router: Router, private http: HttpClient, private httpService: HttpService) {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      const url = event.urlAfterRedirects || event.url;
      const match = url.match(/\/businessOperation.*/);
      this.currentUrl = match ? match[0] : url;
    }
  });
}

ngOnInit() {
  this.username = localStorage.getItem('username') || 'Steve';
  this.role = localStorage.getItem('role') || 'Insitz Plus Admin';

  this.fetchMenuData();
}

async fetchMenuData() {
  try {
    const response: any = await this.httpService.getMenuData().toPromise();
    this.menuItems = response.menus || [];
    this.allowedRoles = response.roles || {};
  } catch (error) {
    console.error("Error fetching menu data", error);
  }
}

getInitials(name: string): string {
  return name.split(' ').map(n => n.charAt(0).toUpperCase()).join('');
}

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

@HostListener('document:click', ['$event'])
closeDropdown(event: Event) {
  if (!(event.target as HTMLElement).closest('.profile-dropdown')) {
    this.isDropdownOpen = false;
  }
}

logout() {
  localStorage.clear();
  this.router.navigate(['/']);
}

toggleMenu(menuName: string) {
  this.activeMenu = this.activeMenu === menuName ? null : menuName;
}

canAccess(menu: any): boolean {
  return this.allowedRoles[menu.name]?.includes(this.role.trim());
}

filterMenu() {
  if (!this.searchQuery.trim()) {
    this.filteredItems = [];
    return;
  }

  this.filteredItems = [];

  this.menuItems.forEach(menu => {
    if (menu.label.toLowerCase().includes(this.searchQuery.toLowerCase())) {
      this.filteredItems.push({ label: menu.label, link: '' });
    }

    menu.submenus.forEach((sub: { label: string; link: string }) => {
      if (sub.label.toLowerCase().includes(this.searchQuery.toLowerCase())) {
        this.filteredItems.push({ label: sub.label, link: sub.link });
      }
    });
  });
}

clearSearch() {
  this.searchQuery = '';
  this.filteredItems = [];
}
}
