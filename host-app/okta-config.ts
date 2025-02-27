export const oktaConfig = {
    issuer: process.env["ISSUER_URI"] as string, 
    clientId: process.env["CLIENT_ID"],
    redirectUri: process.env["REDIRECT_URI"],
    scopes: ['openid', 'profile', 'email'],
    pkce: true
  };
  