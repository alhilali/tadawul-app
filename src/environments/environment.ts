// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000',
  socketIOBaseUrl: 'http://localhost:3000',
  firebase: {
    apiKey: 'AIzaSyBUC-L7Z-32O5DHu6c3C8iuJJtgEfvQpaU',
    authDomain: 'elenco-631e4.firebaseapp.com',
    databaseURL: 'https://elenco-631e4.firebaseio.com',
    projectId: 'elenco-631e4',
    storageBucket: 'elenco-631e4.appspot.com',
    messagingSenderId: '526434334301',
    appId: '1:526434334301:web:46991427f22c3c99ec7fb4',
    measurementId: 'G-MRYVR18K61',
  },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
