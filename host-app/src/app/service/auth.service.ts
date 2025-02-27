import { Injectable } from '@angular/core';
import { oktaConfig } from '../../../okta-config';
import { OktaAuth } from '@okta/okta-auth-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}
  private oktaAuth = new OktaAuth(oktaConfig);

  async login() {
    await this.oktaAuth.signInWithRedirect();
  }

  async logout() {
    await this.oktaAuth.signOut();
    localStorage.removeItem('access_token');  // Clear token
    this.router.navigate(['/login']);
  }

  async handleCallback() {
    await this.oktaAuth.handleRedirect();
  }
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');  // Retrieve token from storage
  }


  async isAuthenticated(): Promise<boolean> {
    //return await this.oktaAuth.isAuthenticated();
    const token = await this.oktaAuth.tokenManager.get('accessToken');
    return !!token;
  }
}
