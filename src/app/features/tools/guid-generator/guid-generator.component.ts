import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TitleTagService } from 'src/app/services/title-tag-service.service';
import { Guid } from 'guid-typescript';
// import { TitleTagService } from 'src/app/shared/services/title-tag-service.service';

@Component({
  selector: 'app-guid-generator',
  templateUrl: './guid-generator.component.html',
  styleUrls: ['./guid-generator.component.css'],
})
export class GuidGeneratorComponent implements OnInit {
  @ViewChild('txtConfigFile', { static: true })
  txtConfigFile!: ElementRef;
  public guidList: string;
  // tslint:disable-next-line: no-use-before-declare
  guidGeneratorInput: IGuidGenerator = new IGuidGenerator();
  constructor(private titleTagService: TitleTagService) {
    this.guidList = Guid.create().toString();
  }

  ngOnInit() {
    this.titleTagService.setTitle('UUID-Generator | Freekagyan online - A Consulting Services');
    this.titleTagService.setSocialMediaTags(location.href,
      'Online-UUID-Generator | Freekagyan online - A Consulting Services',
      'Quickly and easily generate individual or bulk sets of universally unique identifiers (UUIDs) also known as GUID with  Freekagyan online UUID Generator Tool.',
      '');
  }

  genrateGuid(): void {
    let tempGuid: string;
    this.guidList = '';

    if (this.guidGeneratorInput.numOfGuid > 1000)
      this.guidGeneratorInput.numOfGuid = 1000;
    else if (this.guidGeneratorInput.numOfGuid <= 0)
      this.guidGeneratorInput.numOfGuid = 1;

    for (let index = 0; index < this.guidGeneratorInput.numOfGuid; index++) {
      tempGuid = Guid.create().toString();

      if (this.guidGeneratorInput.useUpperCase) {
        tempGuid = tempGuid.toUpperCase();
      }

      if (this.guidGeneratorInput.useHyphens) {
        tempGuid = tempGuid.replace(/\-/gi, '');
      }

      if (this.guidGeneratorInput.useBraces) {
        tempGuid = '{' + tempGuid + '}';
      }

      this.guidList += tempGuid + '\n';
    }
  }

  copyToCB() {
    if (this.txtConfigFile) {
      this.txtConfigFile.nativeElement.select();
      document.execCommand('copy');
      this.txtConfigFile.nativeElement.setSelectionRange(0, 0);
    }
  }
}

export class IGuidGenerator {
  numOfGuid = 1;
  useUpperCase: boolean = false;
  useBraces: boolean = false;
  useHyphens: boolean = false;
}
