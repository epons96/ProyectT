import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subject } from "rxjs";

@Component({
  selector: "app-dialog-show-product",
  templateUrl: "./dialog-show-product.component.html",
  styleUrls: ["./dialog-show-product.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DialogShowProductComponent {
  public element: any;
  _unsubscribeAll: Subject<any>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogShowProductComponent>
  ) {
    this.dialogRef.disableClose = true;
    this.element = data.selectedConciliation.data;

    console.log(this.element);
  }
}
