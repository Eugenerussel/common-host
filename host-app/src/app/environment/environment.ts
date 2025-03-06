import { REACTIVE_NODE } from "@angular/core/primitives/signals";

export const environment = {
    production: false,
    ISSUER_URI: "https://hpproducts-usthealthproofsb.oktapreview.com/oauth2/default",
    CLIENT_ID: "0oabyeuc6i259oC4s1d7",
   // REDIRECT_URI: "https://dev.usthealthproofconnect.com/insitz/login/callback",
   REDIRECT_URI: "http://localhost:8080/insitz/login/callback",
   BOPS_REMOTE_ENTRY: "http://localhost:4201/remoteEntry.js",
   backendBaseURL: "http://localhost:3000",
  };
  