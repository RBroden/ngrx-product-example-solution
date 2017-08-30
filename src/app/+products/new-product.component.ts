import {
    Component,
    OnInit,
    Output,
    EventEmitter
} from '@angular/core';
import {
    Form,
    FormBuilder,
    FormGroup,
    FormControl
} from '@angular/forms';
import { Product } from './_redux/_models/product';

@Component({
    selector: 'app-new-product-form',
    template: `
        <div class="form-container">
            <h4>New Product</h4>
            <form [formGroup]="form" (ngSubmit)="handleSubmit()" novalidate>
                <div class="form-row">
                    <label>Name: </label><input formControlName="name">
                </div>
                <div class="form-row">
                    <label>Price: </label><input formControlName="price" type="number">
                </div>
                <div class="form-row">
                    <button>Create New Product</button>
                </div>
            </form>
        </div>
    `,
    styles: [`
        h4 {
            margin: 0;
            padding: 0;
        }
        .form-container {
            background: #ddd;
        }
    `]
})
export class NewProductFormComponent implements OnInit {
    @Output() onSubmit = new EventEmitter<Product>();
    form: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.fb.group({
            name: '',
            price: null
        });
    }

    handleSubmit() {
        const date = new Date();
        const generateId = date.getFullYear().toString()
            + date.getMonth().toString()
            + date.getDate().toString()
            + date.getHours().toString()
            + date.getMinutes().toString()
            + date.getSeconds().toString()
            + date.getMilliseconds().toString();
        const product = <Product>{
            id: generateId,
            name: this.form.value.name,
            price: this.form.value.price
        };
        this.onSubmit.emit(product);
        this.form.reset();
    }

}
