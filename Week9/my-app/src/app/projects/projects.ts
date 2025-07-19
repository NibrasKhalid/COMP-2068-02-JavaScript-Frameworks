import { Component } from '@angular/core';

// In memory data for projects
export class Project {
  id!: number;
  name!: string; // ! means nullable
  course!: string;
}
// Mock data
const PROJECTS: Project[] = [
  { id: 1, name: 'Android', course: 'COMP-3025' },
  { id: 2, name: 'JavaScript', course: 'COMP-2068' },
  { id: 3, name: 'Linux', course: 'COMP-2018' },
  { id: 4, name: 'Project Management', course: 'COMP-2140' },
  { id: 5, name: 'Abn. Psyc', course: 'GNED-2035' },
  { id: 6, name: 'Sport Psyc', course: 'GNED-2076' }
];

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})

export class Projects {
  projects: Project[] = PROJECTS; 
}
