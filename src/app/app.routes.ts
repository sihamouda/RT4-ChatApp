import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'login', redirectTo: '' },
  { path: 'registration', component: RegistrationComponent },
  { path: 'home/:username', component: HomeComponent },
];
