import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';

const appRoutes: Routes = [
    {
        path: '',
        // pathMatch: 'full',
        // redirectTo: 'products'
        component: HomeComponent
    },
    {
        path: 'products',
        loadChildren: './+products/products.module#ProductsModule',
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            // { enableTracing: true } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
