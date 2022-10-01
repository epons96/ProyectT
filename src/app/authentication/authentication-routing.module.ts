import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ChangePassAuthComponent } from './authentication/change-pass-auth/change-pass-auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module')
          .then((m) => m.LoginModule),
      },
      {
        path: 'email-forgot',
        loadChildren: () => import('./authentication/email-forgot-pass/email-forgot-pass.module')
          .then((m) => m.EmailForgotPassModule),
      },
      {
        path: 'change-pass',
        loadChildren: () => import('./authentication/change-pass-auth/change-pass-auth.module')
          .then((m) => m.ChangePassAuthModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {
}
