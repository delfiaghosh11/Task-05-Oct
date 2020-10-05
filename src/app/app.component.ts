import { StudentsService } from './services/students.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  studentsData = [];

  constructor(private studentsService: StudentsService) {}

  ngOnInit() {
    this.studentsService.getJSON().subscribe((data) => {
      this.studentsData = data;
    });
  }

  updateData() {
    this.studentsData = this.studentsService.getStudents();
  }
}
