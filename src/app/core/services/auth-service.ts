import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { USERLOGGEDEMPTY, UserLogged } from '../models/userLogged';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLogged: UserLogged = USERLOGGEDEMPTY;
  private apiURL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  setUserInLocalStorage(token: string) {
    localStorage.setItem("userToken", token);
  }

  isAuthenticated$(): Observable<boolean> {
    if (localStorage.getItem("userToken") !== 'undefined' && localStorage.getItem("userToken") !== null && localStorage.getItem("userToken") !== "") {
      const userToken: string = localStorage.getItem("userToken")!;
      const decoded: any = jwtDecode(userToken);
      const { name, lastName, email, userId, role } = decoded;
      this.userLogged = { name: name, lastName: lastName, email: email, userId: parseInt(userId), token: userToken, role: role };
      this.isAuthenticatedSubject.next(true);
    } else {
      this.userLogged = USERLOGGEDEMPTY;
      this.isAuthenticatedSubject.next(false);
    }
    return this.isAuthenticatedSubject.asObservable();
  }

  async guardValidation(): Promise<boolean> {
    if (this.userLogged != USERLOGGEDEMPTY && await this.validateToken(this.userLogged.token)) {
      return true;
    }
    return false;
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const requestOptions = {
        headers: new HttpHeaders({
          'accept': 'text/plain',
          'Authorization': 'Bearer ' + localStorage.getItem("userToken"),
          'Content-type': 'application/json',
        }),
        params: new HttpParams().set('token', token)
      };
      const response = await this.http.get<boolean>(this.apiURL+'/tokenValidated', requestOptions).toPromise();
      console.log(response)
      if (typeof response === 'boolean') {
        return response;
      } else {
        console.error('Respuesta de token no válida:', response);
        return false;
      }
    } catch (error) {
      console.error('Error al validar el token:', error);
      return false;
    }
  }
}
