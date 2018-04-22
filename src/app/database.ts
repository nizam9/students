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

    constructor(private sqlite: SQLite) {
        // this.connectToDb();
    }

    createStudentsTable() {
        let sql = "CREATE TABLE IF NOT EXISTS `students`(`studentID` INT PRIMARY KEY NOT NULL, `first_name` VARCHAR(32),`last_name` VARCHAR(32) ,`gender`  VARCHAR(32) , `age` INT(3),`school_name` VARCHAR(32) , `class` VARCHAR(10) ,`father_name` VARCHAR(32) ,`mother_name` VARCHAR(32) ,`contact_number` VARCHAR(32) ,`fees` INT(10) NOT NULL,`date_of_joining` TEXT,`address` TEXT,`referred_by` VARCHAR(32))";
        this.connectToDb(sql, 'CREATE');
    }

    addUser(student_info): void {
        var sql = "INSERT INTO `students` (studentID,first_name,last_name,gender,age,school_name,class,father_name,mother_name,contact_number,fees,date_of_joining,address,referred_by) VALUES (100,'Nizam','Shaik','male',22,'Global','10th class','Khadar','Shahina',4545554554,500,'10-12-2010','Buchi reddy palem','none')";
        // (100,'Nizam','Shaik','male',22,'Global','Khadar','Shahina',4545554554,500,'10-12-2010','Buchi reddy palem','none')
        this.connectToDb(sql, 'INSERT');
    }
    getStudents() {
        console.log('inside get');
        var sql = "SELECT * FROM `students`";
        this.connectToDb(sql, 'SELECT');
    }

    public connectToDb(query, type): void {
        this.sqlite.create(this.options)
            .then((db: SQLiteObject) => {
                // console.log('success', JSON.stringify(db));
                db.executeSql(query, {})
                    .then((response) => {
                        console.log(JSON.stringify(response), 'Query Executed Successfully');
                        alert('success');
                        if (type === 'CREATE') {
                            alert('Student Table Created');
                        } else if (type === 'INSERT') {
                            alert('Student Registered');
                        } else if (type === 'SELECT') {
                            for (var i = 0; i < response.rows.length; i++) {
                                console.log(JSON.stringify(response.rows.item(i)));
                                this.students.push(response.rows.item(i));
                                localStorage.setItem('students', JSON.stringify(this.students));
                            }
                        }

                    }, (error) => {
                        console.log(JSON.stringify(error), 'Error while executing query');
                        alert('failure');
                    })
                    .catch((e) => {
                        alert('catch error1');
                        console.log(JSON.stringify(e), 'Catch Exception');
                    });
            })
            .catch((err) => {
                alert('catch error2');
                console.log(JSON.stringify(err), 'Catch Exception , Error in creating Db');
            });

        // studentID
        // first_name
        // last_name
        // gender
        // age
        // school_name
        // class
        //     father_name
        //     mother_name
        // contact_number
        // fees
        // date_of_joining
        // address
        // referred_by


    }




}

