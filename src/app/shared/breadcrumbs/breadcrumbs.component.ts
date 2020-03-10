import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  public title: string;

  constructor(
    private _router: Router,
    private _title: Title,
    private _meta: Meta
  ) { 
    
    this.getDataRoute()
    .subscribe(data => {
      this.title = data.title;
      this._title.setTitle(this.title);
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.title
      }
      this._meta.updateTag(metaTag);
    })
  }

  ngOnInit(): void {
  }

  getDataRoute() {
    return this._router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    )
  }

}
