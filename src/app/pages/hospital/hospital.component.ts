import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {

  hospital: Hospital[] = [];

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.getHospital();
    this._modalUploadService.notification
    .subscribe( () => this.getHospital());
  }

  addHospital() {
    let newHospital = prompt('Ingrese el nombre del hospital');
    console.log(newHospital);
    if(!newHospital || newHospital.length === 0) {
      return;
    } else {
      this.postHospital(newHospital);
    }
  }

  searchHospital(term: string) {
    if(term.length === 0){
      this.getHospital();
      return;
    }
    this._hospitalService.searchHospital(term)
    .subscribe( result => this.hospital = result);
  }

  getHospital() {
    this._hospitalService.getHospital()
    .subscribe( result => {
      this.hospital = result;
    })
  }

  postHospital(name: string) {
    this._hospitalService.postHospital(name)
    .subscribe(() => this.getHospital());
  }

  putHospital(hospital: Hospital) {
    this._hospitalService.putHospital(hospital)
    .subscribe();
  }

  putImage(hospital: Hospital){
    this._modalUploadService.showModal('hospitals', hospital._id);
  }

  deleteHospital(hospital: Hospital) {
    this._hospitalService.deleteHospital(hospital._id)
    .subscribe(() => this.getHospital());
  }
  

}
