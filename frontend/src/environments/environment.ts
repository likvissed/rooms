// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  auth: {
    clientId: '132',
    authorizationServer: 'https://ac.***REMOVED***/oauth/authorize',
    redirectUrl: 'https://localhost.***REMOVED***:24044/oauth2/callback',
    serverUrl: 'https://localhost.***REMOVED***:24044/api/auth/authorize',
    appName: 'rooms-js-dev',
    jwtOptions: {
      allowedDomains: ['localhost.***REMOVED***:24044'],
      disallowedRoutes: []
    }
  },

  apiUrl: 'https://localhost.***REMOVED***:24044/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
