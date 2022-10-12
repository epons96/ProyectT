import { Component, OnInit } from "@angular/core";
import { BreadcrumbService } from "src/app/shared/layout/breadcrumd/service/breadcrumb.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd("Tienda ABC", true);
  }
}
