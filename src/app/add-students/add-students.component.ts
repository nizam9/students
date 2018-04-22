import { Database } from './../database';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DatePicker } from '@ionic-native/date-picker';
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
            first_name: ['', [Validators.required]],
            last_name: ['', [Validators.required]],
            father_name: ['', [Validators.required]],
            mother_name: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            age: ['', [Validators.required]],
            school_name: ['', []],
            contact_number: ['', [Validators.required]],
            class: ['', []],
            fees: ['', [Validators.required]],
            date_of_joining: ['', [Validators.required]],
            referred_by: ['', []],
            address: ['', []]
        });
    }

    onRegister() {
        console.log(JSON.stringify(this.registerForm.value));
        console.log('Thanks' + this.registerForm.value.first_name);
        this._db.addUser(this.registerForm.value);
    }

}
