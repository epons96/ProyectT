import { NgModule } from "@angular/core";
import { BreadcrumdComponent } from "./breadcrumd.component";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule],
  declarations: [BreadcrumdComponent],
  exports: [BreadcrumdComponent],
})
export class BreadcrumbModule {}
