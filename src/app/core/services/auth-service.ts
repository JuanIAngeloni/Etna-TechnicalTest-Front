import { Injectable } from '@angular/core';
import { USEREMPTY, UserRegister } from '../models/userRegister';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { USERLOGGEDEMPTY, UserLogged } from '../models/userLogged';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLogged: UserLogged = USERLOGGEDEMPTY;

  private apiURL: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);


  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  setUserInLocalStorage(token: string) {
    let tokenString = JSON.stringify(token);
    localStorage.setItem("userToken", tokenString);


}  

  /**
   * Checks if the user is authenticated based on token presence in local storage.
   * @returns {Observable<boolean>} Observable indicating if the user is authenticated.
   */
  isAuthenticated$(): Observable<boolean> {
    if (localStorage.getItem("userToken") !== 'undefined' && localStorage.getItem("userToken") !== null) {
      const userToken: string = localStorage.getItem("userToken")!;
      const decoded: any = jwtDecode(userToken);
      const { name, lastName, email, userId } = decoded;
      this.userLogged = { name: name, lastName: lastName, email: email,userId:userId };
      this.isAuthenticatedSubject.next(true);
      console.log(231,this.userLogged)
    }
    else {
      this.userLogged = USERLOGGEDEMPTY;
      this.isAuthenticatedSubject.next(false);
    }
    return this.isAuthenticatedSubject.asObservable();
  }

  /**
     * Checks if the user token is valid.
     * @param {string} token - The user token to be validated.
     * @returns {Promise<boolean>} Promise indicating if the token is valid.
     */
  // async validateToken(token: string): Promise<boolean> {
  //   const tokenParams = new HttpParams().set('token', token);
  //   try {
  //     const response = await this.http.get<boolean>(`${this.apiURL}/user/tokenvalidation`, { params: tokenParams }).toPromise();
  //     return response; // Devuelve el valor recibido en la respuesta HTTP
  //   }
  //   catch (error) {
  //     console.error('Error al validar el token:', error);
  //     return false; // Devuelve false en caso de error
  //   }
  // }

}