import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductTableComponent } from "./product-table/product-table.component";

const routes: Routes = [
  {
    path: "",
    component: ProductTableComponent,
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
export class ProductRoutingModule {}
