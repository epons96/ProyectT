import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductLayoutComponent } from "./product-layout/product-layout.component";

const routes: Routes = [
  {
    path: "",
    component: ProductLayoutComponent,
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
export class ProductsRoutingModule {}
