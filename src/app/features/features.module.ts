import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { ClockComponent } from './tools/clock/clock.component';
import { DaysCalculatorComponent } from './tools/days-calculator/days-calculator.component';
import { GuidGeneratorComponent } from './tools/guid-generator/guid-generator.component';
import { JsonValidatorComponent } from './tools/json-validator/json-validator.component';
import { TimeZoneConverterComponent } from './tools/time-zone-converter/time-zone-converter.component';
import { ToolsComponent } from './tools/tools.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AirIndexComponent } from './blogs/air-index/air-index.component';
import { StuffDescriptionComponent } from './blogs/stuff-description/stuff-description.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        RouterModule
    ],
    declarations: [
        LandingComponent,
        SignupComponent,
        ProfileComponent,
        ClockComponent,
        DaysCalculatorComponent,
        GuidGeneratorComponent,
        JsonValidatorComponent,
        TimeZoneConverterComponent,
        ToolsComponent,
        BlogsComponent,
        AirIndexComponent,
        StuffDescriptionComponent
    ]
})
export class FeaturesModule { }
