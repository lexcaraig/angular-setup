import {
    ActionReducerMap,
    ActionReducer,
    createSelector,
    createFeatureSelector,
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { RouterStateUrl } from './ngrx.router-serializer';

// -- IMPORT REDUCER --

export interface State {
    // -- IMPORT STATE --
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
    // -- ADD REDUCER --
  routerReducer: fromRouter.routerReducer
};
