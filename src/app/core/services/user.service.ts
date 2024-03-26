import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from '../models/userRegister';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  async postUserRegistration(newUser: UserRegister): Promise<any> {
    try {;
    let url = `${this.apiURL}/register`;
      let response = await this.http.post(url, newUser).toPromise();
      return { data: response, ok: true, errors: [] };
    } catch (error) {
        return { data: { error: error }, ok: false, errors: [error] };
      
    }
  }

}
