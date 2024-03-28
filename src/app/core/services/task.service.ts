import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Task } from '../models/task';
import { TaskPost } from '../models/taskPost';
import { TaskFilter } from '../models/taskFilter';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiURL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  async getTaskList(taskFilter: TaskFilter): Promise<any> {
    try {
      const requestOptions = { headers: new HttpHeaders(environment.newHeaders) };
      let url = `${this.apiURL}/task`;
      
      const params: any = {};
      if (taskFilter.taskId) {
        params.taskId = taskFilter.taskId;
      }
      if (taskFilter.text) {
        params.text = taskFilter.text;
      }
      if (taskFilter.isCompleted !== undefined) {
        params.isCompleted = taskFilter.isCompleted;
      }
      const queryString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
      if (queryString) {
        url += `?${queryString}`;
      }
      
      let response = await this.http.get(url, requestOptions).toPromise();
      return { data: response, ok: true, errors: [] };
    } catch (error) {
      return { data: { error: error }, ok: false, errors: [error] };
    }
  }
  

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
      const requestOptions = { headers: new HttpHeaders(environment.newHeaders) };
      let url = `${this.apiURL}/task`;
      let response = await this.http.put(url, task, requestOptions).toPromise();
      return { data: response, ok: true, errors: [] };
    } catch (error) {
      return { data: { error: error }, ok: false, errors: [error] };

    }
  }
  async UpdateIsCompletedTask(taskId: number): Promise<any> {
    try {
      const requestOptions = {
        headers: new HttpHeaders(environment.newHeaders)
      };
      const url = `${this.apiURL}/task/iscompleted?idTask=${taskId}`; 
      const response = await this.http.put(url,taskId, requestOptions).toPromise();
      return { data: response, ok: true, errors: [] };
    } catch (error) {
      return { data: { error: error }, ok: false, errors: [error] };
    }
  }




  async deleteTask(taskId: number): Promise<any> {
    try {
      const requestOptions = {
        headers: new HttpHeaders(environment.newHeaders)
      };
      const url = `${this.apiURL}/task/delete?idTask=${taskId}`; // Utiliza el parámetro en la URL para la eliminación
      const response = await this.http.put(url,taskId, requestOptions).toPromise(); // Usa el método delete
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



}
