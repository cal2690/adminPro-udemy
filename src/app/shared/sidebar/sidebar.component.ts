import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from 'src/app/services/service.index';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public user: User;

  constructor(
    public _sidebar: SidebarService,
    public _userService: UserService
  ) { }

  ngOnInit() {
    this.user = this._userService.user;
    this._sidebar.loadMenu();
  }

}
