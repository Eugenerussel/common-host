import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient} from '@angular/common/http';
import { AuthInterceptor } from './service/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import OktaAuth from '@okta/okta-auth-js';
import { oktaConfig } from '../../okta-config';

const oktaAuth = new OktaAuth(oktaConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: OktaAuth, useValue: oktaAuth },
  ]
};
