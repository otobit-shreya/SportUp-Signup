import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
// import { EnterdetailComponent } from './enterdetail/enterdetail.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { VerifyComponent } from './verify/verify.component';
import { CongratulationComponent } from './congratulation/congratulation.component';
import { SelectionComponent } from './selection/selection.component';
import { EnterdetailComponent } from './enterdetail/enterdetail.component';
import { PositionsComponent } from './positions/positions.component';
import { CommiteeHomeComponent } from './commitee/commitee-home/commitee-home.component';
import { AddPlayerToCmtComponent } from './commitee/add-player-to-cmt/add-player-to-cmt.component';
 
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'signup', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'selection', component: SelectionComponent },
  { path: 'details',component:MainComponent },
  { path: 'positions',component:PositionsComponent },
  { path: 'congratulation',component:CongratulationComponent },
  { path: 'commitee/home',component:CommiteeHomeComponent},
  { path: 'commitee/addplayer', component:AddPlayerToCmtComponent}
];
 
export const AppRoutingModule = RouterModule.forRoot(routes);