import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { EnterdetailComponent } from './enterdetail/enterdetail.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: SignupComponent },
  { path: 'enterdetail', component: EnterdetailComponent },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
