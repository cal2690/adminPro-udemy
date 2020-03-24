import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from 'src/app/config/config';
import { UserService } from '../user/user.service';
import { Doctor } from 'src/app/models/doctor.model';

@Injectable()
export class DoctorService {

  totalDoctors: number = 0;

  constructor(
    public http: HttpClient,
    public _userService: UserService
  ) { }

  getDoctors() {
    let url = URL_SERVICE + '/doctor';
    return this.http.get(url)
    .map((result: any) => {
      this.totalDoctors = result.total;
      return result.result;
    });
  }

  searchDoctor(term: string) {
    let url = URL_SERVICE + '/search/collection/doctor/' + term;
    return this.http.get(url)
    .map((result: any) => result.result);
  }

  deleteDoctor(id: string) {
    let url = URL_SERVICE + '/doctor/' + id;
    url += '?token=' + this._userService.token;
    return this.http.delete(url)
    .map(result => alert('Médico eliminado correctamente'));
  }

  saveDoctor(doctor: Doctor) {
    let url = URL_SERVICE + '/doctor';
    if (doctor._id) {
      url += '/' + doctor._id;
      url += '?token=' + this._userService.token;
      return this.http.put(url, doctor)
      .map((result: any) => {
        alert('Medico actualizado');
        console.log(result);
        return result.resultSave;
      })
    } else {
      url += '?token=' + this._userService.token;
      return this.http.post(url, doctor)
      .map((result: any) => {
        alert('Medico creado');
        return result.result;
      })
    }
  }

  getDoctor(id: string) {
    let url = URL_SERVICE + '/doctor/' + id;
    return this.http.get(url)
    .map((result: any) => result.result);
  }

}


