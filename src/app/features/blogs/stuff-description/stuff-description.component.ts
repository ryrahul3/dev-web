import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-stuff-description',
  templateUrl: './stuff-description.component.html',
  styleUrls: ['./stuff-description.component.css'],
})
export class StuffDescriptionComponent implements OnInit {
  @Input()
  stuffDiscripiton!: StuffDiscripiton;
  constructor() {}

  ngOnInit() {}
}

export interface StuffDiscripitonBase {
  _text: string;
}
export interface StuffDiscripiton {
  title: StuffDiscripitonBase;
  imagePath: StuffDiscripitonBase;
  description: StuffDiscripitonBase;
}
