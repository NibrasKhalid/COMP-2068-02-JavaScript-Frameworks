import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  //dependency injection for HttpClient
  constructor(private http: HttpClient) { }
  getProjects() {
    return this.http.get('http://localhost:3000/projects');
  }
  //TODO: add methods for creating projects
  //TODO: add methods for updating projects
  //TODO: add methods for deleting projects

}
