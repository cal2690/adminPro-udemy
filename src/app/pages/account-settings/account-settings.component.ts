import { Component, OnInit} from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(private _settings: SettingsService) { }

  ngOnInit() {
    this.putCheck();
  }

  changeColor(theme: string, link: any) {
    
    this.setCheck(link);
    this._settings.setTheme(theme);
 
  }

  setCheck(link: any) {

    let selectors: any = document.getElementsByClassName('selector');
    for (let element of selectors) {
      element.classList.remove('working');
    }
    link.classList.add('working');
  }

  putCheck() {

    let selectors: any = document.getElementsByClassName('selector');
    let theme = this._settings.settings.theme;
    for (let element of selectors) {
      if(element.getAttribute('data-theme')== theme) {
        element.classList.add('working');
        break;
      }
    }
  }

}
