import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private authService: AuthService,private router:Router) {}

  ngOnInit() {}

  lambdaLogin() {
    this.authService.login();
    this.router.navigate(['/insitz']);
  }

}
