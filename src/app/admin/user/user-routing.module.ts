import { UserLayoutComponent } from "./user-layout/user-layout.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserHomeComponent } from "./user-home/user-home.component";

const routes: Routes = [
  {
    path: "",
    component: UserLayoutComponent,
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
