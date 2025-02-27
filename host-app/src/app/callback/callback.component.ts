import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent {
  constructor(private authService: AuthService, private router: Router) {
    this.handleCallback();
  }

  async handleCallback() {
    await this.authService.handleCallback();
    this.router.navigate(['/insitz']); // Redirect to PoC landing page
  }

}
