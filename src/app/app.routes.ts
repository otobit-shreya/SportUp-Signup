import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { EnterdetailComponent } from './enterdetail/enterdetail.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { VerifyComponent } from './verify/verify.component';
import { CongratulationComponent } from './congratulation/congratulation.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'signup', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'enterdetail', component: EnterdetailComponent },
  { path: 'home', component: HomeComponent },
  { path: 'verify', component: VerifyComponent },
  {path:'congratulation',component:CongratulationComponent}
];

export const AppRoutingModule = RouterModule.forRoot(routes);
