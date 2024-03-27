import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiURL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  async postNewTask(newTask: Task): Promise<any> {
    try {;
    let url = `${this.apiURL}/task`;
      let response = await this.http.post(url, newTask).toPromise();
      return { data: response, ok: true, errors: [] };
    } catch (error) {
        return { data: { error: error }, ok: false, errors: [error] };
      
    }
  }

  async putTask(task: Task): Promise<any> {
    try {;
    let url = `${this.apiURL}/task`;
      let response = await this.http.put(url, task).toPromise();
      return { data: response, ok: true, errors: [] };
    } catch (error) {
        return { data: { error: error }, ok: false, errors: [error] };
      
    }
  }

  async getCategories(): Promise<any> {
    try {;
    let url = `${this.apiURL}/category`;
      let response = await this.http.get(url).toPromise();
      return { data: response, ok: true, errors: [] };
    } catch (error) {
        return { data: { error: error }, ok: false, errors: [error] };
      
    }
  }

}
