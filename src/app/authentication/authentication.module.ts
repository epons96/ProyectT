import { NgModule } from '@angular/core';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  imports: [
    AuthenticationRoutingModule,
  ],
  declarations: [
    AuthenticationComponent,
  ],
})
export class AuthenticationModule {
}
