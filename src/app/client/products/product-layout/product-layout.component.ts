import { Component, OnInit } from "@angular/core";
import { BreadcrumbService } from "../../../shared/layout/breadcrumd/service/breadcrumb.service";
import { ProductService } from "../../../core/product/product.service";

@Component({
  selector: "app-product-layout",
  templateUrl: "./product-layout.component.html",
  styleUrls: ["./product-layout.component.scss"],
})
export class ProductLayoutComponent implements OnInit {
  public products: any[];
  constructor(
    private breadcrumbService: BreadcrumbService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd("Tienda ABC", true);

    this.productService.getAllProducts().subscribe((res) => {
      this.products = res;
    });
  }
}
