import {Component, HostBinding, OnInit} from '@angular/core';
import { ThemeService } from './theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';
  subs$: Subscription[] = [];
  @HostBinding('class') className = '';

  constructor(private themeService: ThemeService, private overlay: OverlayContainer){}

  ngOnInit() {
    this.themeService.themeClassNameChanges$.subscribe(className => {
      if (className?.length > 0) {
        this.overlay.getContainerElement().classList.remove(localStorage.getItem('currentTheme')!);
        this.overlay.getContainerElement().classList.add(className)!;
        localStorage.setItem('currentTheme', className)!;
        this.className = className;
      }
    })
  }

}
