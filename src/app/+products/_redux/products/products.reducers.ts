import { Action, createSelector } from '@ngrx/store';
import * as R from 'ramda';

import { Product } from '../_models/product';

import * as products from './products.actions';

export interface State {
    ids: string[];
    entities: { [id: string]: Product };
    selectedProductId: string | null;
    loaded: boolean;
    loading: boolean;
    recentProducts: string[];
    newProductInfo: {
        isCreating: boolean,
        error: any,
    };
};

export const initialState: State = {
    ids: [],
    entities: {},
    selectedProductId: null,
    loaded: false,
    loading: false,
    recentProducts: [],
    newProductInfo: {
        isCreating: false,
        error: null,
    },
};

// Reducer
export const pluckIds = R.map(R.prop('id'));
export const assocById = R.curry((acc, x) => R.assoc(x['id'], x, acc));
export const pushIfNotExist = R.ifElse(R.flip(R.contains), R.identity, R.flip(R.append));

export function reducer(state = initialState, action: products.Actions): State {
    switch (action.type) {

        case products.ActionTypes.CREATE: {
            return R.assocPath(['newProductInfo', 'isCreating'], true, state);
        }

        case products.ActionTypes.CREATE_SUCCESS: {
            return R.compose(
                R.assocPath(['newProductInfo', 'isCreating'], false),
                R.assocPath(['ids'], pushIfNotExist(state.ids, action.payload.id)),
                R.assocPath(['entities', action.payload.id], action.payload)
            )(state);
        }

        case products.ActionTypes.CREATE_FAIL: {
            return R.compose(
                R.assocPath(['newProductInfo', 'isCreating'], false),
                R.assocPath(['newProductInfo', 'error'], action.payload.error),
            )(state);
        }

        case products.ActionTypes.LOAD: {
            return {
                ...state,
                loading: true,
            };
        }

        case products.ActionTypes.LOAD_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
                ids: pluckIds(action.payload),
                entities: R.reduce(assocById, state.entities, action.payload),
            };
        }

        case products.ActionTypes.LOAD_FAIL: {
            return {
                ...state,
                loading: false,
            };
        }

        case products.ActionTypes.UPDATE: {
            return R.assocPath(
                ['entities', action.payload.id],
                action.payload,
            )(state);
        }

        case products.ActionTypes.UPDATE_SUCCESS: {
            return {
                ...state,
                ids: pushIfNotExist(state.ids, action.payload.id),
                entities: assocById(state.entities, action.payload),
            };
        }

        default: {
            return state;
        }
    }
};

// Selectors
export const getEntities = (state: State) => state.entities;
export const getIds = (state: State) => state.ids;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getSelectedId = (state: State) => state.selectedProductId;
export const getSelected = createSelector(
    getEntities,
    getSelectedId,
    (entities, selectedId) => {
        return entities[selectedId];
    }
);
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id]);
});
export const getProductsState = R.prop('products');
export const getAllProducts = createSelector(getProductsState, getAll);
export const getProductsLoading = createSelector(getProductsState, getLoading);
export const getProductsLoaded = createSelector(getProductsState, getLoaded);
export const getSelectedProduct = createSelector(getProductsState, getSelected);
