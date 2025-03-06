const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
require('dotenv').config();

module.exports = withModuleFederationPlugin({

  name: 'host-app',

  remotes: {
    'dailyOperation': process.env.BOPS_REMOTE_ENTRY,  // Remote MFE URL
  },
  exposes: {
    './AuthService': './src/app/service/auth.service.ts' , // Exposing AuthService for microfrontends
    './routes': './src/app/app.routes.ts', // Exposing routes for microfrontends  
    },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
