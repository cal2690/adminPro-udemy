import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from 'src/app/config/config';
import { UserService } from '../user/user.service';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable()
export class HospitalService {

  public totalHospital: number = 0;

  constructor(
    public http: HttpClient,
    public _userService: UserService
  ) { }
  
  getHospital() {
    let url = URL_SERVICE + '/hospital';
    return this.http.get(url).
    map( (result:any) => {
      this.totalHospital = result.total;
      return result.result;
    })
  }

  getHospitalId(id: string) {
    let url = URL_SERVICE + '/hospital/' + id;
    return this.http.get(url)
    .map( (result:any) => result.result )
    
  }

  deleteHospital(id: string) {
    let url = URL_SERVICE + '/hospital/' + id;
    url += '?token=' + this._userService.token;
    return this.http.delete(url)
    .map(result => alert('Hospital eliminado correctamente'));
  }

  postHospital(name: string) {
    let url = URL_SERVICE + '/hospital';
    let user = this._userService.user;
    url += '?token=' + this._userService.token;
    return this.http.post(url, { name, user  }).
    map( (result:any) => {
      alert('Hospital creado correctamente');
      result.result;
    })
  }

  putHospital(hospital: Hospital) {
    let url = URL_SERVICE + '/hospital/' + hospital._id;
    url += '?token=' + this._userService.token;
    return this.http.put(url, hospital)
    .map( (result:any) => {
      alert('Hospital actualizado correctamente');
      return result.result;
    })
  }

  searchHospital(term: string) {
    let url = URL_SERVICE + '/search/collection/hospital/' + term;
    return this.http.get(url).
    map( (result:any) => result.result)
  }

}
