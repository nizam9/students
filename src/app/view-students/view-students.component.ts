import { Component } from '@angular/core';
import { Database } from '../database';
@Component({
    selector: 'view-students',
    templateUrl: 'view-students.component.html',
})
export class ViewStudentsComponent {
    constructor(
        private db: Database,
    ) {
        this.db.getStudents();
        var students = (localStorage.getItem('students'));
        console.log(students, '333333333333333333333');
    }
}
