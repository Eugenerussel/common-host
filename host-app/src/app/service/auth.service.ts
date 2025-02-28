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
    console.log("Logging in...");
    const isAuthenticated = await this.isAuthenticated();
    if (!isAuthenticated) {
      console.log("User is not authenticated, redirecting to Okta login...");
      await this.oktaAuth.signInWithRedirect();
    } else {
      console.log("User is already authenticated, redirecting to landing page...");
      //this.router.navigate(['/insitz']);  // Redirect to landing page if already logged in
    }
  }
  

  async logout() {
    try {
      // Check if a valid access token exists
      const accessToken = await this.oktaAuth.getAccessToken();
      
      if (accessToken) {
        console.log("Revoking access token...");
        await this.oktaAuth.revokeAccessToken();  // Revokes the token
      }
  
      console.log("Clearing token storage...");
      await this.oktaAuth.signOut();  // Clears session & local storage
  
      console.log("Redirecting to Okta logout...");
      window.location.href = `https://your-okta-domain/oauth2/default/v1/logout?
        id_token_hint=${await this.oktaAuth.getIdToken()}&
        post_logout_redirect_uri=${window.location.origin}/login`;
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }
  

  async handleCallback() {
    try {
      await this.oktaAuth.handleRedirect();
      
      const isAuthenticated = await this.isAuthenticated();
      
      if (isAuthenticated){
        console.log("Authentication successful! Redirecting to dashboard...");
        this.router.navigate(['/insitz']);  // Change to your actual landing page
      } else {
        console.error("Authentication failed, redirecting to login.");
        this.router.navigate(['/login']);
      }
    } catch (err) {
      console.error("Error handling Okta redirect:", err);
      this.router.navigate(['/login']);
    }
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
