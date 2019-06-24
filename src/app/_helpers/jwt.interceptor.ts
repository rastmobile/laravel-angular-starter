import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.token) {
      /*request = request.clone({
        setHeaders: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
          Authorization: `Bearer ${currentUser.token}`
        }
      });*/

      request = request.clone({
        headers: request.headers.set(
          "Authorization",
          "Bearer " + `Bearer ${currentUser.token}`
        )
      });

      if (!request.headers.has("Content-Type")) {
        request = request.clone({
          headers: request.headers.set("Content-Type", "application/json")
        });
      }

      request = request.clone({
        headers: request.headers.set("Accept", "application/json")
      });
    } else {
      if (!request.headers.has("Content-Type")) {
        request = request.clone({
          headers: request.headers.set("Content-Type", "application/json")
        });
      }

      request = request.clone({
        headers: request.headers.set("Accept", "application/json")
      });
    }

    return next.handle(request);
  }
}
