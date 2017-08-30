import { Component, Input } from '@angular/core';
import { Product } from './_redux/_models/product';

@Component({
    selector: 'app-products-list-item',
    template: `
        <p>
            {{ product.name }} - {{ product.price | currency:'USD':true }}
        </p>
    `
})
export class ProductListItemComponent {
    @Input() product: Product;
}
