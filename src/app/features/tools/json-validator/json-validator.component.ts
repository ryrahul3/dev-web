import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TitleTagService } from 'src/app/services/title-tag-service.service';
// import { TitleTagService } from 'src/app/shared/services/title-tag-service.service';

@Component({
  selector: 'app-json-validator',
  templateUrl: './json-validator.component.html',
  styleUrls: ['./json-validator.component.css'],
})
export class JsonValidatorComponent implements OnInit {
  public jsonText: any = {};
  public errorText: any;
  public successMessage!: string;
  public doRemoveDuplicates: boolean = false;
  private originalJsonText: any;
  @ViewChild('txtJsonData', { static: true })
  txtJsonData!: ElementRef;
  constructor(private titleTagService: TitleTagService) { }

  ngOnInit() {

    this.titleTagService.setTitle('Json-Beautifier | Freekagyan online - A Consulting Services');

    this.titleTagService.setSocialMediaTags(location.href,
      'online-json-validator | Freekagyan online - A Consulting Services',
      'Freekagyan online JSON validator tool is the free online JSON Formatter/Formatter/beautifier, JSON Validator & JSON Viewer, and also removes duplicate JSON data. a lightweight data-interchange format.',
      '');
  }

  reset() {
    this.jsonText = {};
    this.errorText = null;
    this.successMessage = '';
  }

  get code() {

    if (!this.doRemoveDuplicates)
      return JSON.stringify(this.jsonText, null, 4);

    return JSON.stringify(this.originalJsonText, null, 4)

  }

  set code(v) {
    try {
      this.originalJsonText = v;
      this.jsonText = JSON.parse(v);
      this.errorText = null;
      this.successMessage = "Valid JSon!"
    }
    catch (e:any) {
      this.successMessage = '';
      this.originalJsonText = '';

      this.errorText = e.message;
      var postion = parseInt(this.errorText.split('position')[1]);

      console.log(postion);

      if (!isNaN(postion)) {
        var errorData = v.substr(postion - 25, 60);
        this.errorText += "\n Error Data: " + errorData + " ...";
      }
    };
  }

  copyToCB() {
    if (this.txtJsonData) {
      this.txtJsonData.nativeElement.select();
      document.execCommand('copy');
      this.txtJsonData.nativeElement.setSelectionRange(0, 0);
    }
  }
}
