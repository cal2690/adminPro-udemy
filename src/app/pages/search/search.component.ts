import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from 'src/app/config/config';
import { User } from 'src/app/models/user.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  public users: User[] = [];
  public hospitals: Hospital[] = [];
  public doctors: Doctor[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) { 
    activatedRoute.params
    .subscribe(result => {
      let term = result['term'];
      this.search(term);
    })
  }

  ngOnInit() {
  }

  search(term: string) {
    let url = URL_SERVICE + '/search/all/' + term;
    this.http.get(url)
    .subscribe((result: any) => {
      this.users = result.users;
      this.hospitals = result.hospitals;
      this.doctors = result.doctors;
    })
  }

}
