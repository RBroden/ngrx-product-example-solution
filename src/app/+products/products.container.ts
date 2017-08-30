import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../_redux/reducers';
import * as fromProducts from './_redux/products';
import { Product } from './_redux/_models/product';
import { Observable } from 'rxjs/Observable';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <h1>Products Container</h1>
        <app-products-list 
        [products]="products$ | async"
        [loading]="loading$ | async"
        (onProductCreate)="handleProductCreate($event)">
        </app-products-list>
    `
})
export class ProductsContainerComponent implements OnInit {

    public products$: Observable<Product[]>;
    public loading$: Observable<boolean>;

    constructor(
        public store$: Store<fromRoot.State>,
    ) {
        this.products$ = this.store$.select(fromProducts.getAllProducts);
        this.loading$ = this.store$.select(fromProducts.getProductsLoading);
    }

    public ngOnInit() {
        this.store$.dispatch(new fromProducts.LoadAction());
    }

    handleProductCreate(product: Product) {
        this.store$.dispatch(new fromProducts.CreateAction(product));
    }

}
