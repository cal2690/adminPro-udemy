import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { URL_SERVICE } from 'src/app/config/config';
import { UploadFileService } from '../upload-file/upload-file.service';


@Injectable()
export class UserService {

  public user: User;
  public token: string;


  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadFile: UploadFileService
  ) { 
    this.loadStorage();
  }

  logged() {
    return (this.token.length > 5) ? true : false;
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  saveStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  login (user: User, remember: boolean = false) {

    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICE + '/login';
    return this.http.post(url, user)
    .map((result: any) => {
      this.saveStorage(result.id, result.token, result.result);
      return true;
    })
  }

  saveUser(user: User) {
    let url = URL_SERVICE + '/user';
    return this.http.post(url, user)
    .map( (result: any) => {
      alert('Usuario creado');
      return result.user;
    });
  }

  updateUser(user: User) {
    let url = URL_SERVICE + '/user/' + user._id;
    url+= '?token=' + this.token;
    return this.http.put(url, user)
    .map((result: any) => {
      this.saveStorage(result.resultSave._id, this.token, result.resultSave);
      alert('Usuario actualizado');
      return true;
    })
  }
  
  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

  changeFile(file: File, id: string) {

    this._uploadFile.uploadFile(file, 'users', id)
    .then(result => {
      this.user.image = result.resultUpload.image;
      alert('Imagen actualizada');
      this.saveStorage(id, this.token, result.resultUpload);
    })
    .catch(result => {
      console.log(result);
    })
  }

}
