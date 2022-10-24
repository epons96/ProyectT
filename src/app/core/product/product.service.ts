import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IPagination } from "../interfaces/pagination.class";
import { IProduct } from "../interfaces/product.class";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  url = environment.apiUrl + "productos";
  urlEdit = environment.apiUrl + "productos";
  urlId = environment.apiUrl + "productos/:id";
  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  getAllProducts(query?: IPagination, params?) {
    let httpParams = new HttpParams();
    if (query) {
      Object.keys(query).map((keyQuery) => {
        if (query[keyQuery] != undefined && keyQuery !== "filter") {
          httpParams = httpParams.append(keyQuery, query[keyQuery] + "");
        }
      });
      if (query.filter && query.filter.properties) {
        query.filter.properties.forEach((item) => {
          httpParams = httpParams.append(
            item,
            "%" + query.filter.filterText + "%"
          );
        });
      }
    }
    if (params) {
      // tslint:disable-next-line: triple-equals
      if (params.name != undefined) {
        httpParams = httpParams.set(
          "filter[$and][name][$like]",
          "%" + params.name.toString() + "%"
        );
      }
      if (params.description != undefined) {
        httpParams = httpParams.set(
          "filter[$and][description][$like]",
          "%" + params.description.toString() + "%"
        );
      }
    }
    return this.httpClient.get<any>(this.url).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getProduct(id) {
    return this.httpClient.get<any>(this.url + `/${id}`);
  }

  removeProduct(data): Observable<any> {
    return this.httpClient.delete<any>(this.url + `/${data.id}`);
  }

  addProduct(product: IProduct): Observable<IProduct> {
    // TODO: Required for the InMemoryDb to work.
    return this.httpClient.post<IProduct>(this.url, product);
  }

  editProduct(data) {
    return this.httpClient.patch<any>(
      this.urlId.replace(":id", data.id),
      data,
      this.httpOptions
    );
  }
}
