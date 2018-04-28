// import { LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Database } from '../database';
import { EditStudentsComponent } from '../edit-students/edit-students.component';
@Component({
    selector: 'view-students',
    templateUrl: 'view-students.component.html',
})
export class ViewStudentsComponent {
    public students;
    // public NoStudentsFound;
    constructor(
        private db: Database,
        public navCtrl: NavController,
    ) {
        // let data = this.db.getAllStudents();
        // console.log(JSON.stringify(data), ' Imp Data :::: =============>');
        this.db.getAllStudents().then((response) => {
            // console.log(JSON.stringify(response), 'success inside view');
            this.students = response;
            // this.NoStudentsFound = (response) ? true : false;
        }, (error) => {
            console.log(JSON.stringify(error), 'error inside view');
        })

        // this.students = [
        //     { name: 'Nizam', class: '10th', statusColor: 'table-primary' },
        //     { name: 'Prasanth', class: '9th', statusColor: 'table-success' },
        // ]

        // alert(this.students.length);

    }

    fetchStudentById(studentID) {
        // alert('hai' + studentID);
        this.navCtrl.push(EditStudentsComponent, {
            studentID: studentID,
        });
    };
}
