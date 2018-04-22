import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddStudentsComponent } from '../add-students/add-students.component';
import { ViewStudentsComponent } from '../view-students/view-students.component'
import { Database } from '../database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    private db: Database) {
  }

  addStudents() {
    this.db.createStudentsTable();
    this.navCtrl.push(AddStudentsComponent);
  }

  viewStudents() {
    this.navCtrl.push(ViewStudentsComponent);
  }

  collectAttendance() {
  }

}
