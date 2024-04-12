import {Component, HostBinding, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit{
  isExpanded = false;

  //Used by dark mode toggle
  constructor(protected themeService: ThemeService){}

  ngOnInit(): void {
    this.themeService.initializeThemeService();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
