import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/service.index';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  public doctor: Doctor[] = [];

  constructor(
    public _doctorService: DoctorService
  ) { }

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors() {
    this._doctorService.getDoctors()
    .subscribe( result => this.doctor = result);
  }

  searchDoctor(term: string) {

    if (term.length <= 0) {
      this.getDoctors();
      return;
    }

    this._doctorService.searchDoctor(term)
    .subscribe(result => this.doctor = result);
  }

  deleteDoctor(doctor: Doctor) {
    this._doctorService.deleteDoctor(doctor._id)
    .subscribe(() => this.getDoctors());
  }

}
