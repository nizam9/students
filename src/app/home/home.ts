import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AddStudentsComponent } from '../add-students/add-students.component';
import { ViewStudentsComponent } from '../view-students/view-students.component';
import { Database } from '../database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private db: Database,
    public loadingCtrl: LoadingController, ) {
    // this.db.connectToDb()
  }

  addStudents() {
    // this.db.createStudentsTable();
    this.db.test();
    this.navCtrl.push(AddStudentsComponent);
  }

  viewStudents() {
    // this.presentLoading();
    this.navCtrl.push(ViewStudentsComponent);
    // setTimeout(() => {
    // }, 1000)
  }

  collectAttendance() {
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Getting new Contents...",
      duration: 1000
    });
    loader.present();
  }

}
