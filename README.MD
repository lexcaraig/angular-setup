# Guide for structuring an Angular Applications

## Creating an Angular Project using @angular/cli and installing dependencies using yarn

Ensure that you're using the latest version of `angular/cli` when starting a new project.

To update Angular CLI to a new version, you must update both the global package and your project's local package.

Global package:

```
npm uninstall -g @angular/cli
npm cache clean
# if npm version is > 5 then use `npm cache verify` to avoid errors (or to avoid using --force)
npm install -g @angular/cli@latest
```

Local project package:

```
rm -rf node_modules dist # use rmdir /S/Q node_modules dist in Windows Command Prompt; use rm -r -fo node_modules,dist in Windows PowerShell
npm install --save-dev @angular/cli@latest
npm install
```

reference: https://github.com/angular/angular-cli

For projects that uses material.angular and NgRx:

* ng new <project-name> -r -v -si -p=<project-name> --style=scss --service-worker
* yarn install
* yarn add @angular/platform-server @angular/cdk @angular/flex-layout @angular/material hammerjs @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools @ngrx/router-store jwt-decode font-awesome @ngx-loading-bar/http-client @ngx-loading-bar/router
* yarn add --dev ngrx-store-freeze standard-version 

```
// main.ts

import 'hammerjs';
```

## Generating a universal app and an app shell

* ng generate universal <universal-app-name>
* yarn install
* ng generate app-shell  --universal-app <universal-app-name> --route <app-shell-route-name>

## Short imports

```
//root/tsconfig.json

"baseUrl": "src",
"paths": {
    "@services/*": ["app/path/to/services/*"],
    "@components/*": ["app/somewhere/deeply/nested/*"],
    "@environments/*": ["environments/*"]
}
```

```
// src/tsconfig.app.json

"types": [
    "node"
]
```

e.g `import { environment } from '@environments/environment';`

```
// get your VAPID keys on https://web-push-codelab.glitch.me/
config: {
    BASE_URL: 'http://localhost:3000',
    VAPID_PUBLIC_KEY: ''
  }
```

## Guide for creating index.ts files

reference: https://angular.io/guide/glossary#barrel

For example, imagine three ES2015 modules in a heroes folder:

```
// heroes/hero.component.ts
export class HeroComponent {}

// heroes/hero.model.ts
export class Hero {}

// heroes/hero.service.ts
export class HeroService {}
```

Without a barrel, a consumer needs three import statements:

```
import { HeroComponent } from '../heroes/hero.component';
import { Hero }          from '../heroes/hero.model';
import { HeroService }   from '../heroes/hero.service';
```

You can add a barrel to the heroes folder (called index, by convention) that exports all of these items:

```
export * from './hero.model';   // re-export all of its exports
export * from './hero.service'; // re-export all of its exports
export { HeroComponent } from './hero.component'; // re-export the named thing
```

Now a consumer can import what it needs from the barrel.

`import { Hero, HeroService } from '../heroes'; // index is implied`

## Add initial page loading

Generate a favicons via <a href="https://realfavicongenerator.net/">Real Favicon Generator<a> and paste it into `assets/images/favicons/` folder and put the code below in `index.html` file.

Make sure to include the `manifest.json` in .angular-cli.json.

```
"assets": [
    "assets",
    "favicon.ico",
    "manifest.json"
]
```


```
// src/index.html

<head>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/images/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/favicons/favicon-16x16.png">
    <link rel="icon" type="image/x-icon" href="assets/images/favicons/favicon.ico">
    <link rel="manifest" href="assets/images/favicons/manifest.json">
    <link rel="mask-icon" href="assets/images/favicons/safari-pinned-tab.svg" color="#009344">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="assets/images/favicons/mstile-144x144.png">
    <meta name="theme-color" content="#ffffff">
</head>
```

## Initial Configuration of ngsw-config.json

```
{
  "index": "/index.html",
  "appData": {
    "name": "App Name",
    "description": "App Description"
  },
  "assetGroups": [{
    "name": "app",
    "installMode": "prefetch",
    "resources": {
      "files": [
        "/favicon.ico",
        "/index.html"
      ],
      "versionedFiles": [
        "/*.bundle.css",
        "/*.bundle.js",
        "/*.chunk.js"
      ]
    }
  }, {
    "name": "assets",
    "installMode": "lazy",
    "updateMode": "prefetch",
    "resources": {
      "files": [
        "/assets/**"
      ]
    }
  }, {
    "name": "fonts",
    "resources": {
      "urls": [
        "https://fonts.googleapis.com/**",
        "https://fonts.gstatic.com/**"
      ]
    }
  }]
}
```

## Initial Configuration of manifest.json

```
{
  "dir": "ltr",
  "lang": "en",
  "name": "App Name",
  "scope": "/",
  "display": "standalone",
  "start_url": "./?utm_source=web_app_manifest",
  "short_name": "App Name",
  "theme_color": "#105B63",
  "description": "App Desciprion",
  "orientation": "any",
  "background_color": "#DB9E36",
  "related_applications": [],
  "prefer_related_applications": false,
  "icons": [
      {
          "src": "assets/images/favicons/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
      },
      {
          "src": "assets/images/favicons/android-chrome-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
      },
      {
          "src": "assets/images/favicons/apple-touch-icon-57x57.png",
          "sizes": "57x57",
          "type": "image/png"
      },
      {
          "src": "assets/images/favicons/apple-touch-icon-60x60.png",
          "sizes": "60x60",
          "type": "image/png"
      },
      {
          "src": "assets/images/favicons/apple-touch-icon-72x72.png",
          "sizes": "72x72",
          "type": "image/png"
      },
      {
          "src": "assets/images/favicons/apple-touch-icon-76x76.png",
          "sizes": "76x76",
          "type": "image/png"
      },
      {
          "src": "assets/images/favicons/apple-touch-icon-114x144.png",
          "sizes": "114x144",
          "type": "image/png"
      },
      {
          "src": "assets/images/favicons/apple-touch-icon-120x120.png",
          "sizes": "120x120",
          "type": "image/png"
      },
      {
          "src": "assets/images/favicons/apple-touch-icon-144x144.png",
          "sizes": "144x144",
          "type": "image/png"
      },
      {
          "src": "assets/images/favicons/apple-touch-icon-152x152.png",
          "sizes": "152x152",
          "type": "image/png"
      },
      {
          "src": "assets/images/favicons/apple-touch-icon-180x180.png",
          "sizes": "180x180",
          "type": "image/png"
      }
  ]
}

```

## Subscribing to Service Worker Updates

```
import { MatSnackBar } from '@angular/material';

import { WindowRef } from './../window-ref';

import { SwUpdate } from '@angular/service-worker';

...

this.swUpdate.available.subscribe(event => {

    console.log('[App] Update available: current version is', event.current, 'available version is', event.available);
    let snackBarRef = this.snackBar.open('Newer version of the app is available', 'Refresh');

    snackBarRef.onAction().subscribe(() => {
        this.winRef.nativeWindow.location.reload()
    });

});

this.swUpdate.activated.subscribe(event => {
    console.log('[App] Update activated: old version was', event.previous, 'new version is', event.current);
});
```

## Changes to Rxjs

```
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catch, throw } from 'rxjs/operators';

// How to use

const posts = this.postService.getPosts()
    .pipe(
        map(),
        catch(error => throw(error))
    );
```

Reference for Universal Transfer State
https://medium.com/@evertonrobertoauler/angular-5-universal-with-transfer-state-using-angular-cli-19fe1e1d352c

If this guide helps you, please give a star. :)