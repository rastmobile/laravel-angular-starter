import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLogin() {
    this.http
      .get(`${this.apiUrl}/login`, {
        headers: new HttpHeaders({
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json"
        })
      })
      .subscribe(data => {
        console.log(data);
      });
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
           
            localStorage.setItem("currentUser", JSON.stringify(user));
          }
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
  }
}
