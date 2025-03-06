import { environment } from "./src/environments/environment";

export const oktaConfig = {
    issuer: environment.ISSUER_URI,
    clientId: environment.CLIENT_ID,
    redirectUri: environment.REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
    pkce: true
  };
  