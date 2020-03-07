import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';

// Routes
import { PAGES_ROUTES } from './pages.routes';

// Modules imports
import { SharedModule } from '../shared/shared.module';

// Modules
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { IncrementComponent } from '../components/increment/increment.component';
import { DoughnutchartComponent } from '../components/doughnutchart/doughnutchart.component';


@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementComponent,
        DoughnutchartComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        PagesComponent,
        IncrementComponent,
        DoughnutchartComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})

export class PageModule {}