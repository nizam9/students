import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DatePicker } from '@ionic-native/date-picker';
import { Database } from './../database';
import { NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { NavController } from 'ionic-angular';
import { ViewStudentsComponent } from '../view-students/view-students.component';

@Component({
    selector: 'edit-students',
    templateUrl: 'edit-students.component.html',
    providers: [DatePipe]
})
export class EditStudentsComponent implements OnInit {
    EditForm: FormGroup;
    public ShowEdit;
    public student;
    public studentName;
    public studentID;
    constructor(
        public fb: FormBuilder,
        private datePicker: DatePicker,
        public datepipe: DatePipe,
        private db: Database,
        public navParams: NavParams,
        public toast: Toast,
        public navCtrl: NavController,
    ) {
        let studentID = this.navParams.get('studentID');
        this.db.getStudentById(studentID).then((response) => {
            console.log(JSON.stringify(response), 'success inside student view');
            this.student = response[0];
            this.studentName = this.student.first_name + '' + this.student.last_name;
            this.studentID = this.student.studentID,
                this.EditForm.patchValue({
                    student_id: this.student.studentID,
                    studentID: this.student.studentID,
                    first_name: this.student.first_name,
                    last_name: this.student.last_name,
                    father_name: this.student.father_name,
                    mother_name: this.student.mother_name,
                    gender: this.student.gender,
                    age: this.student.age,
                    school_name: this.student.school_name,
                    contact_number: this.student.contact_number,
                    class: this.student.class,
                    fees: this.student.fees,
                    date_of_joining: this.student.date_of_joining,
                    referred_by: this.student.referred_by,
                    address: this.student.address,
                    created_date: this.datepipe.transform(this.student.created_date, 'dd-MM-yyyy'),
                });

            // this.NoStudentsFound = (response) ? true : false;
        }, (error) => {
            console.log(JSON.stringify(error), 'error inside view');
        })
    }

    ngOnInit(): void {
        this.createEditForm();
        this.EditForm.disable();
        this.ShowEdit = true;
    }

    showDatePicker() {
        console.log('clicked date');
        this.datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
        }).then(
            date => {
                this.EditForm.patchValue({
                    date_of_joining: this.datepipe.transform(date, 'dd-MM-yyyy'),
                });
                console.log('Got date: ', date)
            },
            err => console.log('Error occurred while getting date: ', err)
        );
    }

    createEditForm() {
        this.EditForm = this.fb.group({
            student_id: [null, [Validators.required]],
            studentID: [null, [Validators.required]],
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
            address: ['', []],
            created_date: ['', []]
        });
    }

    enableEditing() {
        this.EditForm.enable();
        this.EditForm.get('student_id').disable();
        this.EditForm.get('created_date').disable();
        this.ShowEdit = false;
    }

    onUpdate() {
        if (this.EditForm.valid) {
            let student_info = this.EditForm.value;
            this.db.updateStudentById(student_info).then((data) => {
                console.log(JSON.stringify(data), 'Inside Success Update');
                this.toast.show(`Student Details Updated Successfully`, '5000', 'center').subscribe(
                    toast => {
                        console.log(toast);
                    });
                setTimeout(() => {
                    this.navCtrl.push(ViewStudentsComponent);
                }, 1000)
            }, (error) => {
                console.log(JSON.stringify(error), 'Inside Error Update');
                this.toast.show(error.message, '8000', 'center').subscribe(
                    toast => {
                        console.log(toast);
                    });
            })
        } else {
            this.toast.show(`Please Fill All Mandatory Fields`, '7000', 'center').subscribe(
                toast => {
                    console.log(toast);
                });
        }

    }

}
