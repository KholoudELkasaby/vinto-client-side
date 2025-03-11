import { Routes  } from '@angular/router';
import { FooterComponent } from './footer/footer.component';  // Correct path
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [



{ path: '', component: ProductsComponent }, 
{ path: 'products', component: ProductsComponent }, 
{ path: 'products/:id', component: ProductDetailsComponent }, 
];
