import { Component, OnInit } from '@angular/core';
import { TitleTagService } from 'src/app/services/title-tag-service.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-days-calculator',
  templateUrl: './days-calculator.component.html',
  styleUrls: ['./days-calculator.component.css']
})
export class DaysCalculatorComponent implements OnInit {
  public birthDate!: Date;
  public today!: Date;
  public showWarning!: boolean;
  public totalDays!: number;
  public totalYears!: number;
  public diffInSeconds!: number;
  public ageDiff!: { years: number; months: number; days: number; };
  model!: NgbDateStruct;
  firstdate: { year: number, month: number, day: number };
  lastdate: { year: number, month: number, day: number };

  constructor(private titleTagService: TitleTagService, private calendar: NgbCalendar) {
    var todaydate = new Date();
    this.firstdate = { year: 1995, month: 6, day: 3 };
    this.lastdate = { year: todaydate.getFullYear(), month: todaydate.getMonth() + 1, day: todaydate.getDate() }

  }

  ngOnInit() {
    this.titleTagService.setTitle('Calculate Duration Between Two Dates – Results |4cb.online');
    this.titleTagService.setSocialMediaTags(location.href,
      'Results page for Date Calculator. Shows number of days between two dates.',
      'Results page for Date Calculator. Shows number of days between two dates.', '',
      'calculator, calculate, duration, days, period, time, day, months, hours, seconds, minutes, weeks, years, date calculator, number of days between two dates, dates, number of days, count days, total dates, total days');

    this.caluclateDiffernce();
  }

  caluclateDiffernce() {

    console.log(this.firstdate)
    console.log(this.lastdate)
    this.birthDate = new Date(this.firstdate.year, this.firstdate.month - 1, this.firstdate.day);
    this.today = new Date(this.lastdate.year, this.lastdate.month - 1, this.lastdate.day);

    console.log(this.birthDate);
    console.log(this.today);
    var d1 = this.birthDate.getTime() / 86400000;
    var d2 = this.today.getTime() / 86400000;
    this.totalDays = d2 - d1;
    var dt1 = this.today.getTime();
    var dt2 = this.birthDate.getTime();
    var diff = dt1 - dt2;
    this.diffInSeconds = diff / 10000;
    this.ageDiff = this.constructCompleteAge();
  }

  constructCompleteAge() {

    var startYear = this.birthDate.getFullYear();
    var startMonth = this.birthDate.getMonth();
    var startDay = this.birthDate.getDate();

    var endYear = this.today.getFullYear();
    var endMonth = this.today.getMonth();
    var endDay = this.today.getDate();

    var february = (endYear % 4 == 0 && endYear % 100 != 0) || endYear % 400 == 0 ? 29 : 28;
    var daysOfMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var startDateNotPassedInEndYear = (endMonth < startMonth) || endMonth == startMonth && endDay < startDay;
    var years = endYear - startYear - (startDateNotPassedInEndYear ? 1 : 0);

    var months = (12 + endMonth - startMonth - (endDay < startDay ? 1 : 0)) % 12;

    // (12 + …) % 12 makes sure index is always between 0 and 11
    var days = startDay <= endDay ? endDay - startDay : daysOfMonth[(12 + endMonth - 1) % 12] - startDay + endDay;

    //  return years + " Years " + months + " Months" + days + " Days.";


    return {
      years: years,
      months: months,
      days: days
    };
  }

}
