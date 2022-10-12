import { Component, OnInit } from "@angular/core";
import { BreadcrumbService } from "../../../shared/layout/breadcrumd/service/breadcrumb.service";

@Component({
  selector: "app-product-layout",
  templateUrl: "./product-layout.component.html",
  styleUrls: ["./product-layout.component.scss"],
})
export class ProductLayoutComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd("Tienda ABC", true);
  }
}
