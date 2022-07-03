import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as countriesAndTimezones from 'countries-and-timezones';
import * as moment from 'moment-timezone'
import html2canvas from 'html2canvas'

import { TitleTagService } from 'src/app/services/title-tag-service.service';


import { Observable, OperatorFunction, Subscriber } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-time-zone-converter',
  templateUrl: './time-zone-converter.component.html',
  styleUrls: ['./time-zone-converter.component.css']
})
export class TimeZoneConverterComponent implements OnInit {
  showWarning: boolean = false;
  countries: Country[] = [];
  timezons: any[] = [];
  selected: any;
  selectedTimeZones: Country[] = [];
  states$!: Country[];
  momentTimeZoneList: any[] = [];
  momentCountries: Country[] = [];

  defaultClocks: Country[] = [];

  public model!: Country;


  // sortConfig1: TypeaheadOrder = {
  //   direction: 'desc',
  //   field: 'name'
  // };

  @ViewChild('screen', { static: true })
  screen!: ElementRef;
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef;
  @ViewChild('downloadLink', { static: true })
  downloadLink!: ElementRef;


  constructor(private titleTagService: TitleTagService) { }

  ngOnInit() {
    this.SourceData();
    this.momentTimeZoneList.push(moment.tz.names());
    this.titleTagService.setTitle('Time Zone Converter/time converter to see pacific time, central time, eastern time, england time, abu dhabi time and also world time/world clock');
    this.titleTagService.setSocialMediaTags(location.href,
      'Time zone converter/time converter to see pacific time, central time, eastern time, england time, abu dhabi time and also world time/world clock',
      'Time Zone Converter online is free that converts times instantly as you type. Convert between major world cities, countries and timezones in both directions', '');

    this.InitTimeZoneList();
  }
  private SourceData() {
    var countryList = countriesAndTimezones.getAllCountries();
    for (var item in countryList) {
      var country = countryList[item as keyof typeof countryList];
      var zones = moment.tz.zonesForCountry(country.id, true)
      for (var zoneIndex in zones) {
        var zone = zones[zoneIndex];
        var tempCountry = { id: country.id, name: country.name, timezoneName: zone.name.trim(), utcOffsetStr: '', utcOffset: zone.offset, time: new Date(), convertedTime: '' };
        this.momentCountries.push(tempCountry);
        if (this.defaultClocks.length <= 4) {
          if (zone.name.trim() === moment.tz.guess() && !this.defaultClocks.some(x => x.timezoneName === zone.name.trim())) {
            this.defaultClocks.push(tempCountry);
          }

          if (zone.name.trim() === "Asia/Kolkata" && !this.defaultClocks.some(x => x.timezoneName === zone.name.trim())) {
            this.defaultClocks.push(tempCountry);
          }
          if (zone.name.trim() === "America/New_York" && !this.defaultClocks.some(x => x.timezoneName === zone.name.trim())) {
            this.defaultClocks.push(tempCountry);
          }
          if (zone.name.trim() === "Europe/London" && !this.defaultClocks.some(x => x.timezoneName === zone.name.trim())) {
            this.defaultClocks.push(tempCountry);
          }
        }

      }
    }
    this.defaultClocks = this.defaultClocks.sort((a, b) => a.name < b.name ? -1 : 1)

  }
  formatter = (x: Country) => x.name;
  search: OperatorFunction<string, readonly {id:any, name:any}[]> = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.momentCountries.filter(state => new RegExp(term, 'i').test(state.name)).slice(0, 10))
  )
  private InitTimeZoneList() {

    // this.states$ = new Observable((observer: Subscriber<string>) => {
    //   // Runs on every search
    //   observer.next(this.selected);
    // })
    //   .pipe(switchMap((token: string) => {
    //     const query = new RegExp(token, 'i');
    //     return of(this.momentCountries.filter((country: Country) => {
    //       var rs1 = query.test(country.name);
    //       var rs2 = query.test(country.timezoneName);
    //       return rs1 || rs2;
    //     }));
    //   }));
  }

  datesTring(value:any) {
    return moment(value).format('YYYY-MM-DDTHH:mm:ssZ')
  }

  changeTimeZone(value: Country) {

    this.timeZoneConvertMoment(value);
  }

  private timeZoneConvertMoment(value: Country) {
    var res = value.convertedTime.split(":");

    const event = new Date();

    event.setHours(Number.parseInt(res[0]), Number.parseInt(res[1]), 11);

    var momDate = moment().tz(value.timezoneName).hours(Number.parseInt(res[0])).minutes(Number.parseInt(res[1]))

    for (var item in this.selectedTimeZones) {
      if (this.selectedTimeZones[item].timezoneName !== value.timezoneName) {
        var localDate = momDate.clone().tz(this.selectedTimeZones[item].timezoneName);
        this.selectedTimeZones[item].time = new Date(localDate.format());
        this.selectedTimeZones[item].convertedTime = localDate.format('HH:mm');
      }
    }
  }

  onSelect(event: any): void {
    if (this.selectedTimeZones.length >= 5) {
      this.showWarning = true;
      this.selected = '';
      return;
    }

    var country = event.item;

    var time = new Date().toLocaleString("en-US", { timeZone: country.timezoneName });

    country.time = new Date(time);

    country.convertedTime = moment(time).format("HH:mm");

    if (!this.selectedTimeZones.some(x => x.timezoneName === country.timezoneName))
      this.selectedTimeZones.push(country);

    this.selected = '';
  }

  removeCountry(country:any) {
    this.showWarning = false;
    this.selectedTimeZones.splice(country, 1);
  }

  screenshot() {
    window.scrollTo(0, 0);
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = '4cb-onine-time-zone.png';
      this.downloadLink.nativeElement.click();
      this.canvas.nativeElement.src = '';
    });
  }
}

export interface Country {
  id: string;
  name: string;
  timezoneName: string;
  utcOffsetStr: string;
  time: Date;
  utcOffset: number;
  convertedTime: string;
}