import { HostBinding, Injectable, OnInit } from "@angular/core";

import { FormControl } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class ThemeService {
    
    toggleControl = new FormControl(false);
    
    //Broadcast the updated Class Name to all subscribers
    private themeClassNameSource = new BehaviorSubject<string>('');
    themeClassNameChanges$ = this.themeClassNameSource.asObservable();

    constructor(){}

    initializeThemeService(): void {
        // To change default theme, change setItem() inputs below and default theme in theme.scss
        // Default Mode
        if (localStorage.getItem('darkMode') == null) {
          localStorage.setItem('darkMode', 'true');
        }
    
        // Default Theme
        if (localStorage.getItem('currentTheme') == null) {
          localStorage.setItem('currentTheme', 'darkModeIndigo');
        }
    
        // Get Mode & Set Toggle State
        const isDarkMode = localStorage.getItem('darkMode');
        this.toggleControl.setValue(localStorage.getItem('darkMode') === 'true' ? true : false);

        // Set Theme (Dark/Light)
        if (isDarkMode=='true') {
            var className = localStorage.getItem('currentTheme')?.replace('light','dark')!;
            this.themeClassNameSource.next(className);
        }
        else {
            var className = localStorage.getItem('currentTheme')?.replace('dark','light')!;
            this.themeClassNameSource.next(className);
        }
    
        // Set mode based on toggle
        this.toggleControl.valueChanges.subscribe((darkMode) => {
          var className = localStorage.getItem('currentTheme')!;
          className = darkMode ? className.replace('light', 'dark') : className.replace('dark','light');   
          localStorage.setItem('darkMode', darkMode ? 'true' : 'false');

          if (darkMode) {
              this.themeClassNameSource.next(className);
          } else {
              this.themeClassNameSource.next(className);
          }
    
      });
    }
    
    // Pass in Mode[Color], Ex: 'ModeDeepPurple', 'ModeBlue', etc.
    // 'dark' or 'light' is appended based on current mode to fulfill class name in theme.scss
    setApplicationTheme(theme: string): void {
        var isDarkMode = localStorage.getItem('darkMode');
        if(isDarkMode == 'true') {
          var className = 'dark'+theme;  
          this.themeClassNameSource.next(className);
        }
        else {
          var className = 'light'+theme;  
          this.themeClassNameSource.next(className);
        }
    }
}