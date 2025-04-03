import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: HomeComponent },
  { path: 'products', component: HomeComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'register', component: HomeComponent },
  { path: 'login', component: HomeComponent },
  { path: 'profile', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'wishlist', component: WishListComponent },
  { path: 'checkout', component: HomeComponent },
  { path: 'history', component: HomeComponent },
  { path: 'order-progress', component: HomeComponent },
  { path: 'reviews', component: HomeComponent },
  { path: '**', component: HomeComponent },
];
