import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ProductsContainerComponent } from './products.container';
import { NewProductFormComponent } from './new-product.component';
import { ProductListComponent } from './products-list.component';
import { ProductListItemComponent } from './products-list-item.component';
import { reducer, ProductEffects } from './_redux/products';
import { ProductsService } from './_redux/products/products.service';
import { ExceptionService } from '../shared/exception.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: ProductsContainerComponent }
        ]),
        StoreModule.forFeature('products', reducer),

        /**
         * Effects.forFeature is used to register effects
         * from feature modules. Effects can be loaded
         * eagerly or lazily and will be started immediately.
         *
         * All Effects will only be instantiated once regardless of
         * whether they are registered once or multiple times.
         */
        EffectsModule.forFeature([ProductEffects]),
    ],
    declarations: [
        ProductsContainerComponent,
        NewProductFormComponent,
        ProductListComponent,
        ProductListItemComponent
    ],
    providers: [
        ProductsService,
        ExceptionService
    ],
})
export class ProductsModule { }
