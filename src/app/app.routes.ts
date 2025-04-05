import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyOTPComponent } from './components/verify-otp/verify-otp.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from '../guards/auth.guard';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/profile/change-password.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { CartComponent } from './components/cart/cart.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ProgressComponent } from './components/progress/progress.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'details/:id', component: DetailsComponent },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'verify-otp',
    component: VerifyOTPComponent,
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
  },
  {
    path: 'profile/details',
    component: UserDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'profile/change-password',
    component: ChangePasswordComponent,
    canActivate: [authGuard],
  },
  { path: 'cart', component: CartComponent },
  { path: 'wishlist', component: WishListComponent },
  { path: 'checkout', component: CheckoutComponent }, //
  { path: 'history', component: OrderHistoryComponent }, //
  { path: 'order-progress', component: ProgressComponent }, //
  { path: 'reviews', component: HomeComponent }, //
  { path: '**', component: HomeComponent }, //
];
