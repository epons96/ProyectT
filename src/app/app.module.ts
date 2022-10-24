import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { taskReducer } from "./store/tasks.reducer";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ tasks: taskReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
