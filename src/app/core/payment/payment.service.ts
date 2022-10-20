import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IPagination } from "../interfaces/pagination.class";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  url = environment.apiUrl + "payments";
  urlId = environment.apiUrl + "payment/:id";
  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  getAllPayments(query?: IPagination, params?) {
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
      if (params.AgencyDestination) {
        httpParams = httpParams.set(
          "AgencyDestination",
          params.AgencyDestination.toString()
        );
      }
    }
    return this.httpClient.get<any>(this.url).pipe(
      map((data) => {
        return data;
      })
    );
  }

  payCart(data: any) {
    return this.httpClient.post<any>(this.url, data);
  }
}
