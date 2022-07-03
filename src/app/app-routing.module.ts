import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirIndexComponent } from './features/blogs/air-index/air-index.component';
import { BlogsComponent } from './features/blogs/blogs.component';
import { NgwithdockerComponent } from './features/blogs/ngwithdocker/ngwithdocker.component';
import { LandingComponent } from './features/landing/landing.component';
import { ProfileComponent } from './features/profile/profile.component';
import { SignupComponent } from './features/signup/signup.component';
import { DaysCalculatorComponent } from './features/tools/days-calculator/days-calculator.component';
import { GuidGeneratorComponent } from './features/tools/guid-generator/guid-generator.component';
import { JsonValidatorComponent } from './features/tools/json-validator/json-validator.component';
import { TimeZoneConverterComponent } from './features/tools/time-zone-converter/time-zone-converter.component';
import { ToolsComponent } from './features/tools/tools.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'user-profile',     component: ProfileComponent },
  { path: 'tools',     component: ToolsComponent },
  { path: 'blogs',     component: BlogsComponent },
  { path: 'signup',           component: SignupComponent },
  { path: 'landing',          component: LandingComponent },
  { path: 'clock',          component: TimeZoneConverterComponent },
  { path: 'guid',          component: GuidGeneratorComponent },
  { path: 'days',          component: DaysCalculatorComponent },
  { path: 'json',          component: JsonValidatorComponent },
  { path: 'ng-docker',          component: NgwithdockerComponent },
  { path: 'air-index',          component: AirIndexComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
