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
    public Validate;
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
            first_name: ['', [Validators.required]],
            last_name: ['', [Validators.required]],
            father_name: ['', [Validators.required]],
            mother_name: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            age: [null, [Validators.required]],
            school_name: ['', []],
            contact_number: [null, [Validators.required]],
            class: ['', []],
            fees: [null, [Validators.required]],
            date_of_joining: ['', [Validators.required]],
            referred_by: ['', []],
            address: ['', []]
        });
    }

    onRegister() {
        // console.log(JSON.stringify(this.registerForm.value));
        // console.log('Thanks' + this.registerForm.value.first_name);
        if (this.registerForm.valid) {
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
        } else {
            this.toast.show(`Please fill all Mandatory Fields`, '7000', 'center').subscribe(
                toast => {
                    console.log(toast);
                });
        }
    }
}
