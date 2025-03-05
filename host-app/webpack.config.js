import { environment } from "./src/app/environment/environment";
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'host-app',

  remotes: {
    dailyOperation: environment.DASHBOARD_URI,  // Remote MFE URL
  },
  exposes: {
    './AuthService': './src/app/service/auth.service.ts' , // Exposing AuthService for microfrontends
    './routes': './src/app/app.routes.ts', // Exposing routes for microfrontends  
    },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
