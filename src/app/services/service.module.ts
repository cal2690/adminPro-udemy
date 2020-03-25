import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { AdminGuard } from './guards/admin.guard';

import { 
  SettingsService, 
  SidebarService, 
  SharedService, 
  UserService, 
  LoginGuardGuard, 
  UploadFileService,
  HospitalService,
  DoctorService,
} from './service.index';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    LoginGuardGuard,
    UploadFileService,
    ModalUploadService,
    HospitalService,
    DoctorService,
    AdminGuard
  ]
})
export class ServiceModule { }
