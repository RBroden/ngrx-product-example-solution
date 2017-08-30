import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../_models/product';
// import { SpinnerService } from '../blocks/spinner';
import { ExceptionService } from '../../../shared/exception.service';

// import { /* ExceptionService, */ SpinnerService } from '../blocks/blocks';
// import { CONFIG, MessageService } from '../shared/shared';

const CONFIG = {
    baseUrls: {
        config: 'commands/config',
        products: 'api/products.json',
    }
};

const productsUrl = CONFIG.baseUrls.products;


@Injectable()
export class ProductsService {
    constructor(
        private _http: Http,
        // private _spinnerService: SpinnerService,
        private _exceptionService: ExceptionService
    ) { }

    addProduct(product: Product) {
        const body = JSON.stringify(product);
        // this._spinnerService.show();
        return this._http
            .post(`${productsUrl}`, body)
            .map(res => res.json().data)
            .catch(this._exceptionService.catchBadResponse);
            // .finally(() => this._spinnerService.hide());
    }

    deleteProduct(product: Product) {
        // this._spinnerService.show();
        return this._http
            .delete(`${productsUrl}/${product.id}`)
            .catch(this._exceptionService.catchBadResponse);
            // .finally(() => this._spinnerService.hide());
    }

    getProducts() {
        // this._spinnerService.show();

        return this._http.get('/api/products')
            .map((response: Response) => <Product[]>response.json().data)
            .catch(this._exceptionService.catchBadResponse);
            // .finally(() => this._spinnerService.hide());
    }

    getProduct(id: string) {
        // this._spinnerService.show();
        return this._http.get(`${productsUrl}/${id}`)
            .map((response: Response) => response.json().data)
            .catch(this._exceptionService.catchBadResponse);
            // .finally(() => this._spinnerService.hide());
    }


    updateProduct(product: Product) {
        const body = JSON.stringify(product);

        return this._http
            .put(`${productsUrl}/${product.id}`, body)
            .catch(this._exceptionService.catchBadResponse);
            // .finally(() => this._spinnerService.hide());
    }
}
