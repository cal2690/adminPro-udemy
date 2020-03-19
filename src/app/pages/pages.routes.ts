import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';

const pagesRoutes: Routes = [
    { 
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data:{title: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data:{title: 'Progress'} },
            { path: 'graphics', component: Graficas1Component, data:{title: 'Graphics'} },
            { path: 'promises', component: PromisesComponent, data:{title: 'Promises'} },
            { path: 'rxjs', component: RxjsComponent, data:{title: 'RXJS'} },
            { path: 'account-settings', component: AccountSettingsComponent, data:{title: 'Account settings'} },
            { path: 'profile', component: ProfileComponent, data:{title: 'Profile'} },
            // Mantenimiento
            { path: 'users', component: UsersComponent, data:{title: 'Mantenimiento de usuarios'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full', data:{title: '404'}}
        ]
    }    
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);