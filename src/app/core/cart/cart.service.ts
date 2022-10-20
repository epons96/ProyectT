import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CartService {
  url = environment.apiUrl + "cart";
  urlId = environment.apiUrl + "cart/:cartId";
  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  addToCart(product: any) {
    return this.httpClient.post<any>(this.url, product);
  }

  getCart() {
    return this.httpClient.get<any>(this.url);
  }

  removeCart(data) {
    return this.httpClient.delete<any>(
      this.urlId.replace(":cartId", data.id),
      this.httpOptions
    );
  }
}
