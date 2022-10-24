import { Component, OnInit, Input } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { IUser } from "src/app/core/interfaces/user.class";
import { CartService } from "../../../core/cart/cart.service";
import * as TaskActions from "../../../store/tasks.actions";
import { LoggedInUserService } from "../../../core/loggedInUser/logged-in-user.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  loggedInUser: IUser;
  constructor(
    private cartService: CartService,
    private store: Store,
    private _snackBar: MatSnackBar,
    private loggedInUserService: LoggedInUserService
  ) {
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
  }

  ngOnInit(): void {}

  addToCart() {
    this.product.UserID = this.loggedInUser.id;
    this.cartService.addToCart(this.product).subscribe(
      (res) => {
        console.log(res);
        this._snackBar.open("Producto agregado al carrito", "", {
          duration: 2000,
          panelClass: "success-snackbar",
        });
        this.store.dispatch(
          new TaskActions.AddTask({
            name: this.product.name,
            state: this.product?.description,
          })
        );
      },
      (error: any) => {
        this._snackBar.open("Ha ocurrido un error al agregar al carrito", "", {
          duration: 2000,
          panelClass: "error-snackbar",
        });
      }
    );
  }
}
