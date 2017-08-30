import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as R from 'ramda';

import * as fromRouter from '@ngrx/router-store';

// state
export interface State {
    routerReducer: fromRouter.RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
    routerReducer: fromRouter.routerReducer
};

// logger
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

// meta reducers
export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger]
    : [];

// Selectors
