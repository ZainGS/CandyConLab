import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ThemeService } from '../theme.service';
import { THUMBSTICKS } from '../models/candycon-thumbstick/candycon-thumbsticks.data';
import { DPADS } from '../models/candycon-dpad/candycon-dpads.data';
import { FACEPLATES } from '../models/candycon-faceplate/candycon-faceplates.data';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { LockinDialogComponent } from './lockin-dialog/lockin-dialog.component';
import { MatDrawerMode } from '@angular/material/sidenav';

type ColorDictionary = {
  [key: string]: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  animations: [
    trigger('rotate', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(180deg)' })),
      transition('default => rotated', animate('150ms ease-out')),
      transition('rotated => default', animate('0ms'))
    ]),
    trigger('rotate-jump', [
      state('default', style({ transform: 'rotate(0) translateX(0px)' })),
      state('rotated', style({ transform: 'rotate(180deg) translateX(0px)' })),
      transition('default => rotated', animate('120ms linear')),
      //transition('rotated => default', animate('0ms linear', style({ transform: 'rotate(360deg) translateX(0)' })))
    ]),
    trigger('trash-shake', [
      state('default', style({ transform: 'translateX(0px)' })),
      state('left', style({ transform: 'translateX(-5px)' })),
      state('right', style({ transform: 'translateX(5px)' })),
      transition('default => left', animate('50ms linear')),
      transition('left => right', animate('50ms linear')),
      transition('right => left', animate('50ms linear')),
      transition('left => default', animate('50ms linear')), // Added transition to return to default from left
      transition('right => default', animate('50ms linear'))  // Added transition to return to default from right
    ])
  ]
})

export class HomeComponent {

  rotateState = 'default';
  rotate() {
    this.rotateState = this.rotateState === 'default' ? 'rotated' : 'default';
    setTimeout(() => this.rotateState = 'default', 160); 
  }


  rotateJumpState = 'default';
  rotateJump() {
    this.rotateJumpState = this.rotateJumpState === 'default' ? 'rotated' : 'default';
    setTimeout(() => this.rotateJumpState = 'default', 130);
  }

  trashShakeState = 'default';
  trashShake() {
    if (this.trashShakeState === 'default') {
      this.trashShakeState = 'left';
      setTimeout(() => this.trashShakeState = 'right', 50);
      setTimeout(() => this.trashShakeState = 'left', 100);
      setTimeout(() => this.trashShakeState = 'default', 150); // Ensures the animation completes before resetting
    }
  }

  categories = [
    { name: 'FACEPLATES', description: '', products: FACEPLATES },
    { name: 'LEFT THUMBSTICKS', description: '', products: THUMBSTICKS },
    { name: 'RIGHT THUMBSTICKS', description: '', products: THUMBSTICKS },
    { name: 'DPADS', description: '', products: DPADS }
  ];

  colorMapping: ColorDictionary = {
    'Arctic White': '#FFFFFF',
    'Bolt Yellow': '#ffd000',
    'Chilli Red': '#e60022',
    'Cyan Blast': '#00fffb',
    'Lemon Burst': '#fbff00',
    'Midnight Purple': '#9900ff',
    'Ocean Mirage': '#003afa',
    'Onyx Black': '#000000',
    'Orange Crush': '#ff9d00',
    'Princess Pink': '#fad1ff',
    'Tiara Teal': '#08ffb1',
    'Toxic Waste': '#00ff1a',
    'Electro City': '#a30036',
    'Retro Shapes': '#d9d9d9'
  };

  // For Sidenav and Parts
  expandedCategory: string | null = null;
  selectedCount: number = 0;

  // Controller Parts
  hoverFaceplate: any = null;
  hoverThumbstick: any = null;
  hoverDPad: any = null;

  selectedFaceplate: any = null;
  selectedLeftThumbstick: any = null;
  selectedRightThumbstick: any = null;
  selectedDPad: any = null;

  faceplateUrl: string | null = null;
  thumbstickLeftUrl: string | null = null;
  thumbstickRightUrl: string | null = null;
  dpadUrl: string | null = null;

  faceplateOpacity: number = 100;
  dPadToggle: boolean = true;

  // Sidenav
  isSidenavOpen = true;
  sidenavMode: MatDrawerMode = 'side'; // Default mode

  // For dark/light mode theming
  mode = '#fff';

  dynamicSidenavContentStyle = {
    'background': 'conic-gradient(from -45deg at calc(100%/3) calc(100%/3), #ffffff 90deg, #0000 0), conic-gradient(from -135deg at calc(100%/3) calc(2*100%/3), #ffffff 90deg, #fcfbfe 0 135deg, #0000 0), conic-gradient(from 135deg at calc(2*100%/3) calc(2*100%/3), #ffffff 90deg, #fcfbfe 0 135deg, #0000 0), conic-gradient(from 45deg at calc(2*100%/3) calc(100%/3), #ffffff 90deg, #fcfbfe 0 135deg, #0000 0,#ffffff 0 225deg,#fcfbfe 0)',
    'background-size': '40px 40px'
  };


  constructor(private themeService: ThemeService, public dialog: MatDialog) {
    this.adjustSidenavMode();
  }

  /*
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  isVideoLoading: boolean = true;
    
  ngBeforeViewInit(): void {
    if (this.videoPlayer.nativeElement.readyState >= 1) {
      this.initializeComponent();
    }
  }

  ngAfterViewInit(): void {

    // Check if the video is already loaded
    if (this.videoPlayer.nativeElement.readyState >= 1) {
      this.initializeComponent();
    }
    // Use addEventListener to attach the loadedmetadata event handler
    // can also try canplaythrough
    this.videoPlayer.nativeElement.addEventListener('loadedmetadata', () => {
      this.initializeComponent();
    });
  }

  initializeComponent() {
    this.isVideoLoading = false;
  }

  */

  // Listen to window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustSidenavMode();
  }

  adjustSidenavMode() {
    // Check window width and adjust sidenav mode
    this.sidenavMode = window.innerWidth > 1200 ? 'side' : 'over';
  }

  ngOnInit(): void {
    this.updateSelectedCount();
    this.expandedCategory = "FACEPLATES";
    localStorage.getItem('mode')?.includes('dark') ? this.mode = 'black' : this.mode = 'white';

    this.themeService.themeClassNameChanges$.subscribe(className => {
      className.includes('dark') ? this.mode = 'black' : this.mode = 'white';
    })
  }

  openDialog(controllerData: any): void {
    const dialogRef = this.dialog.open(LockinDialogComponent, {
      width: '600px',
      data: controllerData,
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle dialog close result if needed
    });
  }

  mouseEnterProduct(product: any, type?: string) {
    if (product.name.includes('Faceplate')) {
      this.hoverFaceplate = product;
    }
    else if (product.name.includes('Thumb Stick')) {
      this.hoverThumbstick = product;
    }
    else if (product.name.includes('DPad')) {
      this.hoverDPad = product;
    }
  }

  mouseLeaveProduct(product: any, type?: string) {
    if (product.name.includes('Faceplate')) {
      this.hoverFaceplate = null;
    }
    else if (product.name.includes('Thumb Stick')) {
      this.hoverThumbstick = null;
    }
    else if (product.name.includes('DPad')) {
      this.hoverDPad = null;
    }
  }

  sidebarClicked(product: any, type?: string): void {

    if (product.name.includes('Faceplate')) {

      if (this.selectedFaceplate != null && this.selectedFaceplate == product) {
        this.selectedFaceplate = null;
        this.faceplateUrl = null;
      }
      else {
        this.selectedFaceplate = product;
        this.faceplateUrl = 'assets/products/faceplate_' + this.selectedFaceplate.partColor.toLowerCase().replace(/\s/g, '') + '.png';
      }
    }
    else if (product.name.includes('Thumb Stick') && type == 'left') {

      if (this.selectedLeftThumbstick != null && this.selectedLeftThumbstick == product) {
        this.selectedLeftThumbstick = null;
        this.thumbstickLeftUrl = null;
      }
      else {
        this.selectedLeftThumbstick = product;
        this.thumbstickLeftUrl = 'assets/products/thumbsticks_' + this.selectedLeftThumbstick.partColor.toLowerCase().replace(/\s/g, '') + '.png';
      }
    }
    else if (product.name.includes('Thumb Stick') && type == 'right') {
      if (this.selectedRightThumbstick != null && this.selectedRightThumbstick == product) {
        this.selectedRightThumbstick = null;
        this.thumbstickRightUrl = null;
      }
      else {
        this.selectedRightThumbstick = product;
        this.thumbstickRightUrl = 'assets/products/thumbsticks_' + this.selectedRightThumbstick.partColor.toLowerCase().replace(/\s/g, '') + '.png';
      }
    }
    else if (product.name.includes('DPad')) {

      if (this.selectedDPad != null && this.selectedDPad == product) {
        this.selectedDPad = null;
        this.dpadUrl = null;
      }
      else {
        this.selectedDPad = product;
        this.dpadUrl = 'assets/products/dpad_' + this.selectedDPad.partColor.toLowerCase().replace(/\s/g, '') + '.png';
      }
    }
    this.updateSelectedCount();
  }

  toggleSidenav(): void {
    this.isSidenavOpen ? this.isSidenavOpen = false : this.isSidenavOpen = true; 
  }

  updateSelectedCount() {
    var selected = 0;
    if (this.selectedFaceplate != null) {
      selected += 1;
    }
    if (this.selectedLeftThumbstick != null) {
      selected += 1;
    }
    if (this.selectedRightThumbstick != null) {
      selected += 1;
    }
    if (this.selectedDPad != null) {
      selected += 1;
    }
    this.selectedCount = selected;
  }

  lockedIn() {
    if (this.selectedCount == 4) {
      var controllerData = {
        faceplateData: this.selectedFaceplate,
        leftThumbstickData: this.selectedLeftThumbstick,
        rightThumbstickData: this.selectedRightThumbstick,
        dpadData: this.selectedDPad
      };
      this.openDialog(controllerData);
    }
  }

  setFaceplateOpacity(event: any) {
    const input = event.target as HTMLInputElement;
    this.faceplateOpacity = +input.value;
  }

  swapThumbsticks() {
    this.rotate();
    var tempThumbstick = this.selectedLeftThumbstick;
    this.selectedLeftThumbstick = this.selectedRightThumbstick;
    this.selectedRightThumbstick = tempThumbstick;

    var tempUrl = this.thumbstickLeftUrl;
    this.thumbstickLeftUrl = this.thumbstickRightUrl;
    this.thumbstickRightUrl = tempUrl;
  }

  randomize() {
    this.rotateJump();
    this.selectedFaceplate = this.categories[0].products[Math.floor(Math.random() * this.categories[0].products.length)];
    this.selectedLeftThumbstick = this.categories[1].products[Math.floor(Math.random() * this.categories[1].products.length)];
    this.selectedRightThumbstick = this.categories[2].products[Math.floor(Math.random() * this.categories[2].products.length)];
    this.selectedDPad = this.categories[3].products[Math.floor(Math.random() * this.categories[3].products.length)];


    this.faceplateUrl = 'assets/products/faceplate_' + this.selectedFaceplate?.partColor?.toLowerCase().replace(/\s/g, '') + '.png';
    this.thumbstickLeftUrl = 'assets/products/thumbsticks_' + this.selectedLeftThumbstick?.partColor?.toLowerCase().replace(/\s/g, '') + '.png';
    this.thumbstickRightUrl = 'assets/products/thumbsticks_' + this.selectedRightThumbstick?.partColor?.toLowerCase().replace(/\s/g, '') + '.png';
    this.dpadUrl = 'assets/products/dpad_' + this.selectedDPad?.partColor?.toLowerCase().replace(/\s/g, '') + '.png';

    this.updateSelectedCount();
  }

  clearParts() {
    this.trashShake();
    this.selectedFaceplate = null;
    this.selectedLeftThumbstick = null;
    this.selectedRightThumbstick = null;
    this.selectedDPad = null;


    this.faceplateUrl = null;
    this.thumbstickLeftUrl = null;
    this.thumbstickRightUrl = null;
    this.dpadUrl = null;

    this.updateSelectedCount();
  }

  hexToRgb(hex: string) {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (hex != undefined) {
      if (hex?.length == 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
      }
      // 6 digits
      else if (hex.length == 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
      }
    }
    return [r, g, b];
  }
}
