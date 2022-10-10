import { NgModule } from "@angular/core";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AuthenticationGuard } from "./authentication/authentication.guard";
import { LayoutCGuard } from "./shared/layout/layoutC.guard";
import { LayoutAGuard } from "./shared/layout/layoutA.guard";

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
    canActivate: [LayoutAGuard],
  },
  {
    path: "client",
    loadChildren: () =>
      import("../app/client/client.module").then((m) => m.ClientModule),
    canActivate: [LayoutCGuard],
  },
  {
    path: "auth",
    loadChildren: () =>
      import("../app/authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
    canActivate: [AuthenticationGuard],
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
