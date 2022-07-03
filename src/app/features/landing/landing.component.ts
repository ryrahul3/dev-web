import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
  mobileNumber!: string;
  constructor() { }

  ngOnInit() { }
  openWhatsApp() { 
    console.log(this.mobileNumber)
    window.open(
      `https://wa.me/+91${this.mobileNumber}`, "_blank")
  }
}
