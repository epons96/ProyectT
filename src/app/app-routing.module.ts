import { NgModule } from "@angular/core";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { LayoutGuard } from "./admin/layout.guard";
import { AppComponent } from "./app.component";
import { AuthenticationGuard } from "./authentication/authentication.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
  {
    path: "admin",
    loadChildren: () =>
      import("../app/admin/admin.module").then((m) => m.AdminModule),
    canActivate: [LayoutGuard],
  },
  {
    path: "auth",
    loadChildren: () =>
      import("../app/authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
    // canActivate: [AuthenticationGuard],
  },
  {
    path: "**",
    redirectTo: "auth",
  },
];

const routerOptions: ExtraOptions = {
  anchorScrolling: "enabled",
  onSameUrlNavigation: "reload",
  scrollPositionRestoration: "enabled",
  relativeLinkResolution: "legacy",
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
