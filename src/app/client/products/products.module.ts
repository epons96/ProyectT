import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductLayoutComponent } from "./product-layout/product-layout.component";
import { ProductsRoutingModule } from "src/app/client/products/products-routing.module";
import { ProductComponent } from "./product/product.component";
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [ProductLayoutComponent, ProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatIconModule,
    FlexLayoutModule,
  ],
})
export class ProductsModule {}