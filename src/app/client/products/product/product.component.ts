import { Component, OnInit, Input } from "@angular/core";
import { CartService } from "../../../core/cart/cart.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  addToCart() {
    this.cartService.addToCart(this.product).subscribe((res) => {
      console.log(res);
    });
  }
}
