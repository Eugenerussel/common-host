import { Component, signal } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private authService: AuthService,private router:Router) {
    this.checkAuth();
  }
   isAuthenticated = signal(false);
   async checkAuth() {
     this.isAuthenticated.set(await this.authService.isAuthenticated());
   }
 
   async lambdaLogin() {
     await this.authService.login();
   }
 
   async logout() {
     await this.authService.logout();
     this.isAuthenticated.set(false);
   }
  }
  // detectIncognitoMode(): Promise<boolean> {
  //   return new Promise((resolve) => {
  //     const fs = (window as any).RequestFileSystem || (window as any).webkitRequestFileSystem;
  //     if (!fs) {
  //       resolve(false);
  //       return;
  //     }
  //     fs((window as any).TEMPORARY, 100, () => resolve(false), () => resolve(true));
  //   });
  // }

