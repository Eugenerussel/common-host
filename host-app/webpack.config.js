const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'host-app',

  remotes: {
    dailyOperation: 'dailyOperation@http://localhost:4201/remoteEntry.js',  // Remote MFE URL
  },
  exposes: {
    './AuthService': './src/app/service/auth.service.ts'  // Exposing AuthService for microfrontends
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
