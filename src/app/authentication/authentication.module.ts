import { NgModule } from "@angular/core";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [AuthenticationRoutingModule, CommonModule],
  declarations: [AuthenticationComponent],
})
export class AuthenticationModule {}
