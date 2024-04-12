import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../models/interfaces/product.model';

@Component({
  selector: 'app-lockin-dialog',
  templateUrl: './lockin-dialog.component.html',
  styleUrls: ['./lockin-dialog.component.scss']
})
export class LockinDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LockinDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  faceplateData?: Product;
  leftThumbstickData?: Product;
  rightThumbstickData?: Product;
  dpadData?: Product;

  ngOnInit() {
    this.faceplateData = this.data.faceplateData; 
    this.leftThumbstickData = this.data.leftThumbstickData; 
    this.rightThumbstickData = this.data.rightThumbstickData; 
    this.dpadData = this.data.dpadData; 
  }
}
