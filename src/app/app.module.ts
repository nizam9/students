import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DatePicker } from '@ionic-native/date-picker';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from './home/home';
import { AddStudentsComponent } from '../app/add-students/add-students.component';
import { ViewStudentsComponent } from '../app/view-students/view-students.component';
import { Database } from './database';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddStudentsComponent,
    ViewStudentsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddStudentsComponent,
    ViewStudentsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Database,
    DatePicker,
    SQLite,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
