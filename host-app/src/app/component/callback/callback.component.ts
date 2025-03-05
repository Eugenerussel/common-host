import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent {
  constructor(private oktaAuth:OktaAuth, private router: Router) {
  }
  async ngOnInit() {
    console.log("Handling authentication callback...");
  
    try {
      // Process the login response from Okta
      await this.oktaAuth.handleLoginRedirect();
      // Check authentication
      const isAuthenticated = await this.oktaAuth.isAuthenticated();
      console.log("User authenticated:", isAuthenticated);
  
      if (isAuthenticated) {
        // Retrieve tokens from token manager
        const accessToken:any = await this.oktaAuth.tokenManager.get('accessToken');
        const idToken:any = await this.oktaAuth.tokenManager.get('idToken');
  
        console.log("Tokens retrieved:", accessToken, idToken);
  
        if (accessToken && idToken) {
          localStorage.setItem('access_token', accessToken.accessToken);
          localStorage.setItem('id_token', idToken.idToken);
        }
  
        console.log("Authentication successful! Redirecting...");
        this.router.navigate(['/insitz']); // Redirect to landing page
      } else {
        console.log("User is not authenticated, redirecting to login...");
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error("Error during authentication callback:", error);
      this.router.navigate(['/login']);
    }
  }
  
}
