import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { EnterdetailComponent } from './enterdetail/enterdetail.component';
import { CongratulationComponent } from './congratulation/congratulation.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'enterdetail', component: EnterdetailComponent },
  {path:'congratulation',component:CongratulationComponent}
];

export const AppRoutingModule = RouterModule.forRoot(routes);
