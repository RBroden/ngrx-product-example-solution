import { Action } from '@ngrx/store';
import { type } from '../../../_redux/util';

import { Product } from '../_models/product';

const ACTION_PREFIX = '[Products] ';

export const ActionTypes = {
    CREATE: type(ACTION_PREFIX + 'Create'),
    CREATE_SUCCESS: type(ACTION_PREFIX + 'Create Success'),
    CREATE_FAIL: type(ACTION_PREFIX + 'Create Fail'),

    LOAD: type(ACTION_PREFIX + 'Load'),
    LOAD_SUCCESS: type(ACTION_PREFIX + 'Load success'),
    LOAD_FAIL: type(ACTION_PREFIX + 'Load fail'),

    UPDATE: type(ACTION_PREFIX + 'Update'),
    UPDATE_SUCCESS: type(ACTION_PREFIX + 'Update Success'),
    UPDATE_FAIL: type(ACTION_PREFIX + 'Update Fail')
};

export class CreateAction implements Action {
    public type = ActionTypes.CREATE;
    constructor(public payload: Product) { }
}

export class CreateSuccessAction implements Action {
    public type = ActionTypes.CREATE_SUCCESS;
    constructor(public payload: Product) { }
}

export class CreateFailAction implements Action {
    public type = ActionTypes.CREATE_FAIL;
    constructor(public payload: any) { }
}

export class UpdateAction implements Action {
    public type = ActionTypes.UPDATE;
    constructor(public payload: Product) { }
}

export class UpdateSuccessAction implements Action {
    public type = ActionTypes.UPDATE_SUCCESS;
    constructor(public payload: Product) { }
}

export class UpdateFailAction implements Action {
    public type = ActionTypes.UPDATE_FAIL;
    constructor(public payload: any) { }
}

export class LoadAction implements Action {
    public type = ActionTypes.LOAD;
    constructor(public payload?: void) { }
}

export class LoadSuccessAction implements Action {
    public type = ActionTypes.LOAD_SUCCESS;
    constructor(public payload: Product[]) { }
}

export class LoadFailAction implements Action {
    public type = ActionTypes.LOAD_FAIL;
    constructor(public payload: any) { }
}

export type Actions =
    CreateAction
    | CreateSuccessAction
    | CreateFailAction
    | LoadAction
    | LoadSuccessAction
    | LoadFailAction
    | UpdateAction
    | UpdateSuccessAction
    | UpdateFailAction;
