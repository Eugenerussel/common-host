const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'host-app',

  remotes: {
    dashboard: 'dashboard@http://localhost:4201/remoteEntry.js',  // Remote MFE URL
    mfeClaims: 'mfeClaims@http://localhost:4202/remoteEntry.js',  // Remote MFE URL
    mfeCallCenter: 'mfeCallcenter@http://localhost:4203/remoteEntry.js',  // Remote MFE URL
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
