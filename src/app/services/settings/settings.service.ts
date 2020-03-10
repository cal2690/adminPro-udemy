import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SettingsService {

  public settings: Settings = {
    themeURL: 'assets/css/colors/default.css',
    theme: 'default'
  };
  
  
  constructor(
    @Inject(DOCUMENT) private _document) {
    this.loadSettings();
  }

  saveSettings() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  loadSettings() {
    if(localStorage.getItem('settings')) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
    this.setTheme(this.settings.theme);
  }

  setTheme(theme: string) {
    console.log(theme);
    let url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url);

    this.settings.theme = theme;
    this.settings.themeURL = url;
    
    this.saveSettings();
  }

}

interface Settings {
  themeURL: string;
  theme: string;
}
