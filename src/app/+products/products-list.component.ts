import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from './_redux/_models/product';

@Component({
    selector: 'app-products-list',
    template: `
        <div *ngIf="loading; else loadedBlock">
            Loading...
        </div>
        <ng-template #loadedBlock>
            <app-products-list-item
                *ngFor="let product of products"
                [product]="product">
            </app-products-list-item>
            <app-new-product-form
                (onSubmit)="handleProductCreate($event)">
            </app-new-product-form>
        </ng-template>
    `
})
export class ProductListComponent {
    @Input() products: number;
    @Input() loading: boolean;
    @Output() onProductCreate = new EventEmitter<Product>();

    handleProductCreate(product: Product) {
        this.onProductCreate.emit(product);
    }
}
