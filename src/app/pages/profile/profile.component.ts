import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public user: User;
  public uploadFile: File;
  public imageTemp;

  constructor(
    private _userService: UserService
  ) {
    this.user = this._userService.user;
   }

  ngOnInit() {
  }

  saveProfile(user: User) {
    this.user.name = user.name;
    if(!this.user.google) {
      this.user.email = user.email;
    }
  
    this._userService.updateUser(this.user)
    .subscribe(result => {})
  }

  selectFile(file: File) {
    
    if (!file) {
      this.uploadFile = null;
      return;
    }

    if(file.type.indexOf('image') < 0) {
      alert('El archivo seleccionado no es una imagen');
      this.uploadFile = null;
      return;
    }
    
    this.uploadFile = file;
  
    let reader = new FileReader();
    let urlImageTemp = reader.readAsDataURL(file);

    console.log(reader);

    reader.onloadend = () => this.imageTemp = reader.result;

  }

  changeFile() {
    this._userService.changeFile(this.uploadFile, this.user._id);
  }

}
