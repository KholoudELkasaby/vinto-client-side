import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: HomeComponent },
  { path: 'products', component: HomeComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'register', component: HomeComponent },
  { path: 'login', component: HomeComponent },
  { path: 'profile', component: HomeComponent },
  { path: 'cart', component: HomeComponent },
  { path: 'wishlist', component: HomeComponent },
  { path: 'checkout', component: HomeComponent },
  { path: 'history', component: HomeComponent },
  { path: 'order-progress', component: HomeComponent },
  { path: 'reviews', component: HomeComponent },
  { path: '**', component: HomeComponent },
];
