import { Component, OnInit } from '@angular/core';
import { TitleTagService } from 'src/app/services/title-tag-service.service';

@Component({
  selector: 'app-ngwithdocker',
  templateUrl: './ngwithdocker.component.html',
  styleUrls: ['./ngwithdocker.component.css']
})
export class NgwithdockerComponent implements OnInit {

  constructor(private titleTagService: TitleTagService) { }

  ngOnInit() {
    this.titleTagService.setTitle('Angular 9 with Docker Step by Step example | Freekagyan online - A Consulting Services');

    this.titleTagService.setSocialMediaTags(location.href,
      'Blogs | Angular 9 with Docker Step by Step example',
      `Build and run Angular application in a Docker container using nginx web server`,
      '');
  }

}
