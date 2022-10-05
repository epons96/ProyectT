import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { LoggedInUserService } from "../loggedInUser/logged-in-user.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { IUser } from "../interfaces/user.class";
import { IPagination } from "../interfaces/pagination.class";

@Injectable({
  providedIn: "root",
})
export class UserService {
  url = environment.apiUrl + "users";
  urlId = environment.apiUrl + "users/:userId";
  clientUrl = environment.apiUrl + "clients";
  clientIdUrl = environment.apiUrl + "clients/:id";
  lastRoute = "";
  httpOptions = {};
  allUsers: IUser[] = [];
  readonly usersUpdated$: BehaviorSubject<IUser[]> = new BehaviorSubject<
    IUser[]
  >(null);
  readonly userUpdated$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(
    null
  );
  readonly routeChange$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(null);

  constructor(
    private httpClient: HttpClient,
    private loggedInUserService: LoggedInUserService
  ) {
    this.loggedInUserService = loggedInUserService;

    this.httpOptions = {
      // params: new HttpParams().set('limit', '0')
    };
  }

  addUser(user: IUser): Observable<IUser> {
    // TODO: Required for the InMemoryDb to work.
    return this.httpClient.post<IUser>(this.url, user);
  }

  editUser(data) {
    return this.httpClient.put<IUser>(
      this.urlId.replace(":userId", data.id),
      data,
      this.httpOptions
    );
  }

  getAllUsers(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();
    if (query) {
      let httpParams = new HttpParams();
      httpParams = httpParams.append("limit", query.limit.toString());
      httpParams = httpParams.append("offset", query.offset.toString());

      if (query.filter && query.filter.properties) {
        query.filter.properties.forEach((item) => {
          httpParams = httpParams.append(
            item,
            "%" + query.filter.filterText + "%"
          );
        });
      }

      if (query.order) {
        httpParams = httpParams.append("order", query.order);
      }
    } else {
      httpParams = httpParams.set("limit", "0");
      httpParams = httpParams.set("offset", "0");
    }
    if (params) {
      if (params.AgencyId) {
        httpParams = httpParams.append(
          "filter[$and][AgencyId]",
          params.AgencyId
        );
      }
      if (params.status) {
        httpParams = httpParams.append("filter[$and][status]", params.status);
      }
      if (params.role) {
        httpParams = httpParams.append(
          "filter[$and][$or][role][$like]",
          `%${params.role}%`
        );
      }
      if (params.name) {
        httpParams = httpParams.append(
          "filter[$and][$or][name][$like]",
          `%${params.name}%`
        );
      }
      if (params.username) {
        httpParams = httpParams.append(
          "filter[$and][$or][username][$like]",
          `%${params.username}%`
        );
      }
      if (params.lastname) {
        httpParams = httpParams.append(
          "filter[$and][$or][lastname][$like]",
          `%${params.lastname}%`
        );
      }
      if (params.phone) {
        httpParams = httpParams.append(
          "filter[$and][$or][phone][$like]",
          `%${params.phone}%`
        );
      }
      if (params.email) {
        httpParams = httpParams.append(
          "filter[$and][$or][email][$like]",
          `%${params.email}%`
        );
      }
    }
    return this.httpClient.get<any>(this.url, { params: httpParams }).pipe(
      map((data) => {
        if (params && params.isExternal == false) {
          data.result = data.result.filter(
            (item) => item.isExternal == undefined
          );
          return data;
        } else if (params && params.isExternal == true) {
          data.result = data.result.filter(
            (item) => item.isExternal != undefined
          );
          return data;
        } else {
          return data;
        }
      })
    );
  }

  getAllUsersChildren(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();
    if (query) {
      let httpParams = new HttpParams();
      httpParams = httpParams.append("limit", query.limit.toString());
      httpParams = httpParams.append("offset", query.offset.toString());

      if (query.filter && query.filter.properties) {
        query.filter.properties.forEach((item) => {
          httpParams = httpParams.append(
            item,
            "%" + query.filter.filterText + "%"
          );
        });
      }

      if (query.order) {
        httpParams = httpParams.append("order", query.order);
      }
    } else {
      httpParams = httpParams.set("limit", "0");
      httpParams = httpParams.set("offset", "0");
    }
    if (params) {
      if (params.role) {
        httpParams = httpParams.append("filter[$and][role]", params.role);
      }
      if (params.AgencyId) {
        httpParams = httpParams.append(
          "filter[$and][AgencyId]",
          params.AgencyId
        );
      }
    }
    return this.httpClient
      .get<any>(this.url + "/children", { params: httpParams })
      .pipe(
        map((data) => {
          if (params && params.isExternal == false) {
            data.result = data.result.filter(
              (item) => item.isExternal == undefined
            );
            return data;
          } else if (params && params.isExternal == true) {
            data.result = data.result.filter(
              (item) => item.isExternal != undefined
            );
            return data;
          } else {
            return data;
          }
        })
      );
  }

  getUser(data) {
    if (typeof data === "number") {
      return this.httpClient.get<IUser>(
        this.urlId.replace(":userId", data.toFixed()),
        this.httpOptions
      );
    } else {
      return this.httpClient.get<IUser>(
        this.urlId.replace(":userId", data.id),
        this.httpOptions
      );
    }
  }

  removeUser(data) {
    return this.httpClient.delete<IUser>(
      this.urlId.replace(":userId", data.id),
      this.httpOptions
    );
  }

  ////////////////// CLIENT PARTS ////////////////////

  getAllClients(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();
    if (query) {
      httpParams = httpParams.append("limit", query.limit.toString());
      httpParams = httpParams.append("offset", query.offset.toString());

      if (query.filter && query.filter.properties) {
        query.filter.properties.forEach((item) => {
          httpParams = httpParams.append(
            item,
            "%" + query.filter.filterText + "%"
          );
        });
      }

      if (query.order) {
        httpParams = httpParams.append("order", query.order);
      }
    } else {
      httpParams = httpParams.set("limit", "0");
      httpParams = httpParams.set("offset", "0");
    }
    if (params) {
      if (params.role) {
        httpParams = httpParams.append("filter[$and][role]", params.role);
      }
      if (params.AgencyId) {
        httpParams = httpParams.append(
          "filter[$and][AgencyId]",
          params.AgencyId
        );
      }
      if (params.status) {
        httpParams = httpParams.append("filter[$and][status]", params.status);
      }
    }
    return this.httpClient
      .get<any>(this.clientUrl, { params: httpParams })
      .pipe(
        map((data) => {
          if (params && params.isExternal == false) {
            data.result = data.result.filter(
              (item) => item.isExternal == undefined
            );
            return data;
          } else if (params && params.isExternal == true) {
            data.result = data.result.filter(
              (item) => item.isExternal != undefined
            );
            return data;
          } else {
            return data;
          }
        })
      );
  }

  getClient(data) {
    if (data.constructor != Object) {
      return this.httpClient.get<IUser>(
        this.clientIdUrl.replace(":id", data + ""),
        this.httpOptions
      );
    } else {
      return this.httpClient.get<IUser>(
        this.urlId.replace(":id", data.id),
        this.httpOptions
      );
    }
  }

  addClient(Client: any): Observable<any> {
    return this.httpClient.post<any>(this.clientUrl, Client);
  }

  editClient(data: any): Observable<any> {
    return this.httpClient.put<any>(
      this.clientUrl + "/" + data.id + "",
      data,
      this.httpOptions
    );
  }

  removeClient(data) {
    return this.httpClient.delete<any>(
      this.clientUrl + "/" + data.id + "",
      this.httpOptions
    );
  }
}
