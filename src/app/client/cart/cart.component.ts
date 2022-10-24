import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { IUser } from "src/app/core/interfaces/user.class";
import { LoggedInUserService } from "src/app/core/loggedInUser/logged-in-user.service";
import { PaymentService } from "src/app/core/payment/payment.service";
import { ConfirmationDialogComponent } from "src/app/shared/confirmation-dialog/confirmation-dialog.component";
import { BreadcrumbService } from "src/app/shared/layout/breadcrumd/service/breadcrumb.service";
import { CartService } from "../../core/cart/cart.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  cartProducts: any;
  cartProductsP: any[] = [2];
  cartId: number;
  total: number = 0;
  loggedInUser: IUser;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private cartService: CartService,
    private loggedInUserService: LoggedInUserService,
    private paymentService: PaymentService,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
  }

  ngOnInit(): void {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd("Tienda ABC", true);
    this.getcartProducts();
  }

  getcartProducts() {
    this.cartService.getCart().subscribe((data) => {
      this.total = 0;
      if (data) {
        this.cartProducts = data;
        this.cartProducts.forEach((element) => {
          this.total = element.price + this.total;
        });
        this.ref.markForCheck();
      }
    });
  }

  removeFromCart(item: any) {
    this.cartService.removeCart(item).subscribe((res) => {
      if (res) {
        this._snackBar.open("El producto ha sido eliminado con éxito.", "", {
          duration: 2000,
          panelClass: "success-snackbar",
        });
      } else {
        this._snackBar.open("Error al eliminar el elemento ", "", {
          duration: 2000,
          panelClass: "error-snackbar",
        });
      }
    });
    this.getcartProducts();
    this.ref.markForCheck();
  }

  async onPayCart(element) {
    let data = element;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "450px",
      data: {
        title: "Confirmación",
        question: "Estas seguro de pagar este(os) elemento(s)?",
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      try {
        if (result) {
          let UserId = this.loggedInUser.id;
          data.createdAt = new Date().toISOString();
          data.UserID = UserId;
          this.paymentService.payCart(data).subscribe((res) => {
            this._snackBar.open("Su pago ha sido exitoso.", "", {
              duration: 2000,
              panelClass: "success-snackbar",
            });
          });
          // const data = await Promise.all(
          //   element.map((item) => {
          //     console.log(item);
          //     item.UserId = this.loggedInUser.id;
          //     item.createdAt = new Date().toISOString();
          //     this.paymentService.payCart(item).toPromise();
          //   })
          // );
          const cartIdsArray = element.map((cart) => cart);
          cartIdsArray.forEach((id) => {
            this.cartService
              .removeCart(id)
              .subscribe(() => this.getcartProducts());
          });
          // this.showToastr.success(
          //   "Pago exitoso",
          //   "Éxito"
          // );
        }
      } catch (error) {
        this._snackBar.open("Error al realizar el pago " + error, "", {
          duration: 2000,
          panelClass: "error-snackbar",
        });
        this.getcartProducts();
      }
    });
  }
}
