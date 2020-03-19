import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  public user: User[] = [];
  public from: number = 0;
  public totalRecords: number = 0;
  public loading: boolean = true;

  constructor(
    public _userService: UserService,
    public _modalUpload: ModalUploadService
  ) { }

  ngOnInit() {
    this.readUser();

    this._modalUpload.notification.subscribe(result => this.readUser());
  }

  showModal(id: string) {
    this._modalUpload.showModal('users', id);
  }

  readUser() {

    this.loading = true;

    this._userService.readUser(this.from)
    .subscribe((result: any) => {
      console.log(result);
      this.totalRecords = result.total;
      this.user = result.result;
      this.loading = false;
    })
  }

  changePage(value: number) {
    let from = this.from + value;

    if(from >= this.totalRecords) {
      return;
    }

    if(from < 0) {
      return;
    }

    this.from += value;
    this.readUser();
  }

  searchUser(term: string) {
    
    console.log(term);

    if (term.length <= 0) {
      this.readUser();
    }

    this.loading = true;

    this._userService.searchUser(term)
    .subscribe((result: User[]) => {
      this.user = result;
      this.loading = false;
    })
  }

  deleteUser(user: User) {
    
    if(user._id === this._userService.user._id) {
      alert('Accion invalida. No puede eliminar el usuario logueado');
      return;
    }

    var confirmDelete = confirm('Esta seguro que quiere eliminar el usuario ' +user.name + ' ?');

    if( confirmDelete) {
      
      this._userService.deleteUser(user._id)
      .subscribe( (result: any) => {
        this.readUser();
      })
    }
  }

  updateUser(user: User) {
    this._userService.updateUser(user).subscribe();
  }

}
