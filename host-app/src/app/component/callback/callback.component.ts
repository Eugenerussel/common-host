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
    this.oktaAuth.handleLoginRedirect()
  .then(() => {
    console.log("Authentication successful! Redirecting...");
    return this.router.navigate(['/insitz']); 
  })
  .catch((error) => {
    console.error("Error during authentication callback:", error);
    return this.router.navigate(['/login']); 
  });
}
}
