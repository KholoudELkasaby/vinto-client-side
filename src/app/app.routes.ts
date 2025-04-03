import { Routes } from '@angular/router';
import { SignupComponent } from '../components/signup/signup.component';
import { VerifyOTPComponent } from '../components/verify-otp/verify-otp.component';
import { LoginComponent } from '../components/login/login.component';
import { WelcomeComponent } from '../components/welcome/welcome.component';
import { authGuard } from '../guards/auth.guard';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { UserDetailsComponent } from '../components/user-details/user-details.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from '../components/profile/change-password.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
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
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [authGuard],
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
  },
  {
    path: '**',
    redirectTo: 'signup',
  },
];
