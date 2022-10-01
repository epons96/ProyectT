import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePassAuthComponent } from './change-pass-auth.component';

const routes: Routes = [
  {
    path: '',
    component: ChangePassAuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePassAuthRoutingModule {
}
