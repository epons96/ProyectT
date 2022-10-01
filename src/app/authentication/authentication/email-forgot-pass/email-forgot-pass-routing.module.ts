import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailForgotComponent } from './email-forgot-pass.component';

const routes: Routes = [
  {
    path: '',
    component: EmailForgotComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailForgotPassRoutingModule {
}
