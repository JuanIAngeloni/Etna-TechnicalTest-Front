import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Task } from '../models/task';
import { TaskPost } from '../models/taskPost';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiURL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  async postNewTask(newTask: TaskPost): Promise<any> {
    try {

      const requestOptions = { headers: new HttpHeaders(environment.newHeaders) };
      let url = `${this.apiURL}/task`;
      let response = await this.http.post(url, newTask, requestOptions).toPromise();
      return { data: response, ok: true, errors: [] };
    } catch (error) {
      return { data: { error: error }, ok: false, errors: [error] };

    }
  }

  async putTask(task: Task): Promise<any> {
    try {
      ;

      const requestOptions = { headers: new HttpHeaders(environment.newHeaders) };
      let url = `${this.apiURL}/task`;
      let response = await this.http.put(url, task, requestOptions).toPromise();
      return { data: response, ok: true, errors: [] };
    } catch (error) {
      return { data: { error: error }, ok: false, errors: [error] };

    }
  }

  async getCategories(): Promise<any> {
    try {
      const requestOptions = { headers: new HttpHeaders(environment.newHeaders) };

      console.log(1,environment.newHeaders)
      let url = `${this.apiURL}/category`;

      let response = await this.http.get(url, requestOptions).toPromise();
      return { data: response, ok: true, errors: [] };
    } catch (error) {
      return { data: { error: error }, ok: false, errors: [error] };
    }
  }

  async getTaskById(taskId: number): Promise<any> {
    try {
      const requestOptions = { headers: new HttpHeaders(environment.newHeaders) };

      let url = `${this.apiURL}/task/${taskId}`;
      let response = await this.http.get(url, requestOptions).toPromise();
      return { data: response, ok: true, errors: [] };
    } catch (error) {
      return { data: { error: error }, ok: false, errors: [error] };

    }
  }

}
