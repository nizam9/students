import { Database } from './../database';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DatePicker } from '@ionic-native/date-picker';
import { Toast } from '@ionic-native/toast';
import { NavController } from 'ionic-angular';

import { ViewStudentsComponent } from '../view-students/view-students.component';

@Component({
    selector: 'add-students',
    templateUrl: './add-students.component.html',
    providers: [DatePipe]
})
export class AddStudentsComponent {
    registerForm: FormGroup;

    constructor(
        public fb: FormBuilder,
        private datePicker: DatePicker,
        public datepipe: DatePipe,
        private _db: Database,
        public toast: Toast,
        public navCtrl: NavController,
    ) {

    }

    showDatePicker() {
        console.log('clicked date');
        this.datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
        }).then(
            date => {
                this.registerForm.patchValue({
                    date_of_joining: this.datepipe.transform(date, 'dd-MM-yyyy'),
                });
                console.log('Got date: ', date)
            },
            err => console.log('Error occurred while getting date: ', err)
        );
    }

    ngOnInit() {
        this.createRegisterForm();
    }

    createRegisterForm() {
        this.registerForm = this.fb.group({
            studentID: ['', [Validators.required]],
            first_name: ['nizam', [Validators.required]],
            last_name: ['shaik', [Validators.required]],
            father_name: ['khadar', [Validators.required]],
            mother_name: ['shahina', [Validators.required]],
            gender: ['male', [Validators.required]],
            age: [21, [Validators.required]],
            school_name: ['global', []],
            contact_number: [3333333333, [Validators.required]],
            class: ['10', []],
            fees: [500, [Validators.required]],
            date_of_joining: ['10-10-2016', [Validators.required]],
            referred_by: ['abeed', []],
            address: ['buchi', []]
        });
    }

    onRegister() {
        // console.log(JSON.stringify(this.registerForm.value));
        // console.log('Thanks' + this.registerForm.value.first_name);
        this._db.addStudent(this.registerForm.value).then((data) => {
            console.log(JSON.stringify(data), 'Inside success Add-Student');
            this.toast.show(`New Student Added Successfully`, '5000', 'center').subscribe(
                toast => {
                    console.log(toast);
                });
            setTimeout(() => {
                this.navCtrl.push(ViewStudentsComponent);
            }, 1000)

        }, (error) => {
            console.log(JSON.stringify(error), 'Inside error Add-Student');
            if (error.messgae === "sqlite3_step failure: UNIQUE constraint failed: students.studentID") {
                alert('Student Id already exist');
            } else {
                this.toast.show(error.message, '8000', 'center').subscribe(
                    toast => {
                        console.log(toast);
                    });
            }

        })
    }

}
