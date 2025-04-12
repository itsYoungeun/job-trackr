import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddapplicationComponent } from './pages/addapplication/addapplication.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'add-application', component: AddapplicationComponent},
  { path: 'profile', component: ProfileComponent },
];
