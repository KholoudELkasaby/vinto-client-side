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
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { ShipmentManagementComponent } from './components/shipment-management/shipment-management.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminSelectionComponent } from './components/admin/admin-selection/admin-selection.component';
import { ServerFailComponent } from './components/server-fail/server-fail.component';

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
    path: 'profile/data',
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
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'wishlist', component: WishListComponent, canActivate: [authGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] }, //
  {
    path: 'history',
    component: OrderHistoryComponent,
    canActivate: [authGuard],
  }, //
  {
    path: 'order-progress',
    component: ProgressComponent,
    canActivate: [authGuard],
  }, //
  {
    path: 'shipments',
    component: ShipmentManagementComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/:model',
    component: AdminSelectionComponent,
    canActivate: [authGuard],
  },
  {
    path: 'fail',
    component: ServerFailComponent,
  },
  { path: 'not-auth', component: NotAuthorizedComponent },
  { path: '**', component: NotFoundComponent }, //
];
