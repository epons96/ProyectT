import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "../shared/layout/layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      //   {
      //     path: "dashboard",
      //     loadChildren: () =>
      //       import("./../dashboard/dashboard.module").then(
      //         (m) => m.DashboardModule
      //       ),
      //     canActivate: [ReporteGuard],
      //   },
      {
        path: "users",
        loadChildren: () =>
          import("./user/user.module").then((m) => m.UserModule),
      },
      {
        path: "products",
        loadChildren: () =>
          import("./product/product.module").then((m) => m.ProducstModule),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "error/404",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
