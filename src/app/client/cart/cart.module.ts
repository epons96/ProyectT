import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartComponent } from "./cart.component";
import { CartRoutingModule } from "./cart-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, CartRoutingModule, FlexLayoutModule],
})
export class CartModule {}
