import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterStateSerializer, } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './ngrx.router-serializer';
import { reducers } from './ngrx.reducers';
import { metaReducers } from './ngrx.meta-reducers';
import { AllEffects } from './ngrx.effects';

import { environment } from '@environments/environment';

// -- IMPORT SERVICES --
import { AuthInterceptor } from '@core/services/interceptors';
import { CustomHttpClient, applicationHttpClientCreator } from '@core/services/custom-http-client';

// Providing the ApplicationHttpClient so it could be used as a service.
export const applicationHttpClient = {
  provide: CustomHttpClient,
  useFactory: applicationHttpClientCreator,
  deps: [ HttpClient ]
};

export const httpInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};

/**
 * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
 * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
 * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
 */
export const routerStateSerializer = {
  provide: RouterStateSerializer,
  useClass: CustomRouterStateSerializer
};

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([...AllEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25, }) : [],
  ],
  exports: [],
  providers: [
    applicationHttpClient,
    httpInterceptor,
    routerStateSerializer,

    // -- PROVIDERS --
  ]
})
export class NgrxModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgrxModule
    };
  }
}
