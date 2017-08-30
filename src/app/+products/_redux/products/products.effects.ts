import * as R from 'ramda';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// import { Observable } from 'rxjs/Observable';
// import { Observer } from 'rxjs/Observer';
// import { never } from 'rxjs/observable/never';
import { of } from 'rxjs/observable/of';

import * as products from './products.actions';
import { ProductsService } from './products.service';
import { Product } from '../_models/product';

@Injectable()
export class ProductEffects {

    @Effect()
    public loadProducts$ = this.actions$
        .ofType(products.ActionTypes.LOAD)
        .switchMap(() =>
            this.productsService.getProducts()
                .map((xs: Product[]) => new products.LoadSuccessAction(xs))
                .catch(error => of(new products.LoadFailAction(error))),
    );

    @Effect()
    public createProduct$ = this.actions$
      .ofType(products.ActionTypes.CREATE)
      .switchMap((action: products.CreateAction) =>
        this.productsService.addProduct(action.payload)
          .map((xs: Product) => new products.CreateSuccessAction(xs))
          .catch(error => of(new products.CreateFailAction(error))),
      );

    @Effect()
    public updateProduct$ = this.actions$
        .ofType(products.ActionTypes.UPDATE)
        .switchMap((action: products.UpdateAction) =>
            this.productsService.updateProduct(action.payload)
            .map((x: Product) => new products.UpdateSuccessAction(x))
            .catch(error => of(new products.UpdateFailAction({
                error: error,
                id: action.payload.id
            })))
        );

    constructor(
        private actions$: Actions,
        private productsService: ProductsService,
    ) { }

}
