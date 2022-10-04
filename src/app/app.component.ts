import { Component, OnDestroy, OnInit } from "@angular/core";
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { Subscription } from "rxjs";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  mediaSub!: Subscription;
  deviceXs!: boolean;
  langs: any[] = [];

  constructor(public mediaObserver: MediaObserver) {}

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        this.deviceXs = result.mqAlias == "xs" ? true : false;
      }
    );
  }
  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }
}
