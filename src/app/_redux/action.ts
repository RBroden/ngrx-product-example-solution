import { Action as NgrxAction } from '@ngrx/store';
export { Action as NgrxAction } from '@ngrx/store';

export interface Action extends NgrxAction  {
  type: string;
  payload?: any;
  error?: any;
  meta?: any;
}
