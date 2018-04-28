import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class Database {
    public students = [];
    options: any = {
        name: 'students.db',
        location: 'default',
        createFromLocation: 1
    }

    public db;

    constructor(private sqlite: SQLite,
    ) {
        // this.connectToDb();

        this.sqlite.create({
            name: 'students.db',
            location: 'default',
            createFromLocation: 1
        })
            .then((database: SQLiteObject) => {

                this.db = database;
                let sql = "CREATE TABLE IF NOT EXISTS `students`(`studentID` INT PRIMARY KEY NOT NULL,`first_name` VARCHAR(32),`last_name` VARCHAR(32) ,`gender`  VARCHAR(32) , `age` INT(3),`school_name` VARCHAR(32) , `class` VARCHAR(10) ,`father_name` VARCHAR(32) ,`mother_name` VARCHAR(32) ,`contact_number` VARCHAR(32) ,`fees` INT(10) NOT NULL,`date_of_joining` TEXT,`address` TEXT,`referred_by` VARCHAR(32))";

                database.executeSql(sql, {})
                    .then(() => console.log('Executed SQL'))
                    .catch(e => console.log(e));

            })
            .catch(e => console.log(e));
    }

    test() {
        console.log(JSON.stringify(this.db));
    }

    addStudent(student_info) {

        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO `students` (studentID,first_name,last_name,gender,age,school_name,class,father_name,mother_name,contact_number,fees,date_of_joining,address,referred_by) VALUES ('" + student_info.studentID + "','" + student_info.first_name + "','" + student_info.last_name + "','" + student_info.gender + "','" + student_info.age + "','" + student_info.school_name + "','" + student_info.class + "','" + student_info.father_name + "','" + student_info.mother_name + "','" + student_info.contact_number + "','" + student_info.fees + "','" + student_info.date_of_joining + "','" + student_info.address + "','" + student_info.referred_by + "')";

            this.db.executeSql(sql, {}).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

    getAllStudents() {

        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `students`";
            this.students = [];
            this.db.executeSql(sql, []).then((data) => {
                for (let i = 0; i < data.rows.length; i++) {
                    this.students.push(data.rows.item(i));
                }
                resolve(this.students);
            }, (error) => {
                reject(error);
            });
        });
    }

    getStudentById(studentID) {

        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `students` WHERE studentID=" + studentID;
            this.students = [];
            this.db.executeSql(sql, []).then((data) => {
                for (let i = 0; i < data.rows.length; i++) {
                    this.students.push(data.rows.item(0));
                }
                resolve(this.students);
            }, (error) => {
                reject(error);
            });
        });
    }

}
