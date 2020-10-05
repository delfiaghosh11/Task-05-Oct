import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  students = [];

  constructor(private http: HttpClient) {
    this.getJSON().subscribe((data) => {
      this.students = data;
      this.setStudents(data);
    });
  }

  getJSON(): Observable<any> {
    return this.http.get(
      'https://jsonblob.com/api/f0b33ee5-03a8-11eb-909d-27a9d4f5c8fa'
    );
  }

  getStudents() {
    return this.students;
  }

  setStudents(sArray) {
    this.students = sArray;
  }

  updateStudent = (
    roll,
    name,
    city,
    college,
    qualification,
    gender,
    isCompleted
  ) => {
    this.getStudents().map((item) =>
      item.roll === roll
        ? ((item.name = name),
          (item.city = city),
          (item.college = college),
          (item.qualification = qualification),
          (item.gender = gender),
          (item.isCompleted = isCompleted))
        : item
    );
  };

  deleteStudent(index) {
    this.getStudents().splice(index, 1);
  }
}
