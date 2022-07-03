import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClockService } from 'src/app/services/clock.service';


@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit, OnDestroy {
  @Input() TimeZoneName: string | undefined;
  private _clockSubscription: Subscription = new Subscription;
  time: Date | undefined;

  constructor(private clockService: ClockService) { }

  ngOnInit(): void {

    this._clockSubscription = this.clockService.getClock().subscribe(time => {
      if (this.TimeZoneName) {
        var tempTime = new Date(time).toLocaleString("en-US", { timeZone: this.TimeZoneName.trim() });
        this.time = new Date(tempTime);
      } else {
        var tempTime = new Date(time).toLocaleString("en-US");
        this.time = new Date(tempTime);
      }
    });
  }

  ngOnDestroy(): void {
    this._clockSubscription.unsubscribe();
  }

}
