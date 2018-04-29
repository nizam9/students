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

    // public db;

    constructor(private sqlite: SQLite,
    ) {
        this.connectToDb();

    }

    connectToDb() {
        // alert('1');
        this.sqlite.create({
            name: 'students.db',
            location: 'default',
            createFromLocation: 1
        })
            .then((database: SQLiteObject) => {
                // alert('2');
                // this.db = database;
                let sql = "CREATE TABLE IF NOT EXISTS `students`(`studentID` INT PRIMARY KEY NOT NULL,`first_name` VARCHAR(32),`last_name` VARCHAR(32) ,`gender`  VARCHAR(32) , `age` INT(3),`school_name` VARCHAR(32) , `class` VARCHAR(10) ,`father_name` VARCHAR(32) ,`mother_name` VARCHAR(32) ,`contact_number` VARCHAR(32) ,`fees` INT(10) NOT NULL,`date_of_joining` TEXT,`address` TEXT,`referred_by` VARCHAR(32),`created_date` TEXT,`updated_date` TEXT)";

                database.executeSql(sql, {})
                    .then(() => console.log('Executed SQL'))
                    .catch(e => console.log(e));

            })
            .catch(e => {
                console.log(e);
                // alert('3');
            });
    }

    test() {
        // console.log(JSON.stringify(this.db));
    }

    addStudent(student_info) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO `students` (studentID,first_name,last_name,gender,age,school_name,class,father_name,mother_name,contact_number,fees,date_of_joining,address,referred_by,created_date,updated_date) VALUES ('" + student_info.studentID + "','" + student_info.first_name + "','" + student_info.last_name + "','" + student_info.gender + "','" + student_info.age + "','" + student_info.school_name + "','" + student_info.class + "','" + student_info.father_name + "','" + student_info.mother_name + "','" + student_info.contact_number + "','" + student_info.fees + "','" + student_info.date_of_joining + "','" + student_info.address + "','" + student_info.referred_by + "','" + new Date() + "','" + new Date() + "')";
            this.sqlite.create(this.options)
                .then((db: SQLiteObject) => {
                    db.executeSql(sql, {}).then((data) => {
                        resolve(data);
                    }, (error) => {
                        reject(error);
                    });
                })
        });
    }

    getAllStudents() {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `students`";
            this.students = [];
            this.sqlite.create(this.options)
                .then((db: SQLiteObject) => {
                    db.executeSql(sql, []).then((data) => {
                        for (let i = 0; i < data.rows.length; i++) {
                            this.students.push(data.rows.item(i));
                        }
                        resolve(this.students);
                    }, (error) => {
                        reject(error);
                    });
                })

        });
    }

    getStudentById(studentID) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM `students` WHERE studentID=" + studentID;
            this.students = [];
            this.sqlite.create(this.options)
                .then((db: SQLiteObject) => {
                    db.executeSql(sql, []).then((data) => {
                        for (let i = 0; i < data.rows.length; i++) {
                            this.students.push(data.rows.item(0));
                        }
                        resolve(this.students);
                    }, (error) => {
                        reject(error);
                    });
                });
        });
    }

    updateStudentById(student_info) {
        console.log(JSON.stringify(student_info), '==>> student_info db')
        return new Promise((resolve, reject) => {

            let sql = "UPDATE `students` SET first_name='" + student_info.first_name + "',last_name ='" + student_info.last_name + "',gender = '" + student_info.gender + "',age='" + student_info.age + "',school_name='" + student_info.school_name + "',class='" + student_info.class + "',father_name='" + student_info.father_name + "',mother_name='" + student_info.mother_name + "',contact_number='" + student_info.contact_number + "',fees='" + student_info.fees + "',date_of_joining='" + student_info.date_of_joining + "',address='" + student_info.address + "',referred_by='" + student_info.referred_by + "',updated_date='" + new Date() + "' WHERE studentID = " + student_info.studentID;

            this.sqlite.create(this.options)
                .then((db: SQLiteObject) => {
                    db.executeSql(sql, {}).then((data) => {
                        resolve(data);
                    }, (error) => {
                        reject(error);
                    });
                })
        });
    }

}
