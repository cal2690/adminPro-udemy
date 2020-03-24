import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

// Routes
import { PAGES_ROUTES } from './pages.routes';

// Modules imports
import { SharedModule } from '../shared/shared.module';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

// Modules
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { IncrementComponent } from '../components/increment/increment.component';
import { DoughnutchartComponent } from '../components/doughnutchart/doughnutchart.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalComponent } from './hospital/hospital.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorsComponent } from './doctors/doctors.component';




@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementComponent,
        DoughnutchartComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        ModalUploadComponent,
        HospitalComponent,
        DoctorComponent,
        DoctorsComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        PagesComponent,
        IncrementComponent,
        DoughnutchartComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})

export class PageModule {}