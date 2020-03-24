import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService, HospitalService } from 'src/app/services/service.index';
import { Doctor } from 'src/app/models/doctor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  hospitals: Hospital[] = [];
  hospital: Hospital = new Hospital('');
  doctor: Doctor = new Doctor('', '', '', '', '');

  constructor(
    public _doctorService: DoctorService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if ( id !== 'new' ) {
        this.getDoctor(id);
      }
    });
  }

  ngOnInit() {
    this._hospitalService.getHospital()
    .subscribe( result => this.hospitals = result );
    this._modalUploadService.notification.subscribe(result => {
      this.doctor.image = result.resultUpload.image;
    });
  }

  getDoctor( id: string ) {
    this._doctorService.getDoctor(id)
    .subscribe( result => {
      this.doctor = result;
      this.doctor.hospital = result.hospital._id;
      this.changeHospital(this.doctor.hospital);
    });
  }

  changeHospital( id: string ) {
    this._hospitalService.getHospitalId(id)
    .subscribe( (result: any) => {
      this.hospital = result;
    }) 
  }

  saveDoctor(form: NgForm) {
    if ( form.invalid ) {
      return;
    }
    this._doctorService.saveDoctor(this.doctor)
    .subscribe( result => {
      this.doctor._id = result._id;
      this.router.navigate(['/doctor', result._id ]);
    });
  }

  changePhoto() {
    this._modalUploadService.showModal('doctors', this.doctor._id);
  }


}
