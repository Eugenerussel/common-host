import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'host-app';
  role = localStorage.getItem('role');
  username = localStorage.getItem('username');
  menuVisible: boolean = false;
  constructor(private router: Router) {
    if (this.role === null) {
      localStorage.setItem('role', 'admin');
    } 
    if(this.username === null) {
      localStorage.setItem('username', 'Steve');
    }
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
 

toggleMenu() {
  this.menuVisible = !this.menuVisible;
}
}
