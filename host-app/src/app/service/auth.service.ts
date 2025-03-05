import { Injectable } from '@angular/core';
import { oktaConfig } from '../../../okta-config';
import { OktaAuth } from '@okta/okta-auth-js';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router,private http: HttpClient) {}
  private oktaAuth = new OktaAuth(oktaConfig);

  // async login() {
  //   console.log("Logging in...");
  //   const isAuthenticated = await this.oktaAuth.isAuthenticated();
  //   if (!isAuthenticated) {
  //     console.log("User is not authenticated, redirecting to Okta login...");
  //     await this.oktaAuth.signInWithRedirect();
  //   } else {
  //     console.log("User is already authenticated, redirecting to landing page...");
  //     //this.router.navigate(['/insitz']);  // Redirect to landing page if already logged in
  //   }
  // }
  async login() {
    console.log("Logging in...");
  
    const isAuthenticated = await this.oktaAuth.isAuthenticated();
  
    if (!isAuthenticated) {
      console.log("User is not authenticated, redirecting to Okta login...");
      await this.oktaAuth.signInWithRedirect({
        scopes: ['openid', 'email', 'profile', 'roles', 'active_group', 'offline_access'],
      });
    } else {
      console.log("User is already authenticated, retrieving tokens...");
      
      // Get tokens from Okta SDK
      const tokenResponse:any = await this.oktaAuth.tokenManager.get('accessToken');
  
      if (tokenResponse) {
        console.log("Tokens retrieved successfully.");
  
        localStorage.setItem('access_token', tokenResponse.accessToken);
        localStorage.setItem('id_token', tokenResponse.idToken);
  
        console.log("Authentication successful! Redirecting...");
        this.router.navigate(['/insitz']); // Redirect to landing page
      } else {
        console.log("No tokens found, redirecting to login...");
        this.router.navigate(['/login']);
      }
    }
  }
  
  
    public jwt_decode(token: string): any {
    const decodedToken: any = jwtDecode(token);
    return token || {};
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
  
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');  // Retrieve token from storage
  }


  async isAuthenticated(): Promise<boolean> {
    //return await this.oktaAuth.isAuthenticated();
    const token = await this.oktaAuth.tokenManager.get('accessToken');
    return !!token;
  }
}
