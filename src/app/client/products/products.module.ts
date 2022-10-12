import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductLayoutComponent } from "./product-layout/product-layout.component";
import { ProductsRoutingModule } from "src/app/client/products/products-routing.module";
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [ProductLayoutComponent, ProductComponent],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
