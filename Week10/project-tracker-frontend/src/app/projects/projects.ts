import { Component } from '@angular/core';
import { ProjectsService } from '../services/projects';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
  constructor(private projectsSvc: ProjectsService) { }
  projects: any;
  getProjects() {
    this.projectsSvc.getProjects().subscribe((data: any) => {
      this.projects = data;
    });
  }
  ngOnInit(): void{
    this.getProjects();
    console.log(this.projects);
  }
}
