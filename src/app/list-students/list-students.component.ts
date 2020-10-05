import { StudentsService } from './../services/students.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css'],
})
export class ListStudentsComponent implements OnInit {
  @Input() students: any;
  @Input() colorSelectedDelete;
  @Input() colorAllDelete;
  @Input() colorReload;
  @Output() parentFun: EventEmitter<any> = new EventEmitter();

  editMode = new Array();
  studentArray = new Array();
  femaleImgUrl: string;
  maleImgUrl: string;
  gender: string;
  isCompleted: boolean;
  allDeleted: boolean;
  selected = new Array();

  constructor(private studentsService: StudentsService) {
    this.femaleImgUrl =
      'https://www.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-512.png';
    this.maleImgUrl =
      'https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-3-avatar-2754579_120516.png';
    this.allDeleted = false;
  }

  ngOnInit() {
    this.studentsService.getJSON().subscribe((data) => {
      this.studentArray = data;
      this.studentArray.map((item) => this.editMode.push(false));
      // console.log(this.editMode);
    });
  }

  setGender(e) {
    if (e.target.value === 'female') {
      this.gender = 'female';
    } else {
      this.gender = 'male';
    }
  }

  editRow(student, index) {
    this.editMode[index] = true;
    this.gender = student.gender;
    this.isCompleted = student.isCompleted;
  }

  saveRow(student, index) {
    if (
      student.name === '' ||
      student.city === '' ||
      student.college === '' ||
      student.qualification === '' ||
      this.gender === ''
    ) {
      this.editMode[index] = true;
    } else {
      this.editMode[index] = false;
      this.studentsService.updateStudent(
        student.roll,
        student.name,
        student.city,
        student.college,
        student.qualification,
        this.gender,
        this.isCompleted
      );
      this.parentFun.emit();
      // console.log(this.studentsService.getStudents());
    }
  }

  delete(e) {
    this.studentsService.deleteStudent(e);
    this.parentFun.emit();
    // console.log(this.studentsService.getStudents());
  }

  deleteSelected() {
    this.selected = this.studentArray.filter(
      (item) => item.isCompleted === true
    );
    if (this.selected.length > 0) {
      this.studentArray = this.students;
      this.studentArray = this.studentArray.filter(
        (item) => item.isCompleted === false
      );
      this.studentsService.setStudents(this.studentArray);
      this.parentFun.emit();
      // console.log(this.studentsService.getStudents());
    } else {
      alert('Please select at least one item to delete.');
    }
  }

  deleteAll() {
    this.studentArray = this.students;
    this.studentArray.map((item) => (item.isCompleted = true));
    this.studentArray = this.studentArray.filter(
      (item) => item.isCompleted === false
    );
    this.allDeleted = true;
    this.studentsService.setStudents(this.studentArray);
    this.parentFun.emit();
    // console.log(this.studentsService.getStudents());
  }
}
