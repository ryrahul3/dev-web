import { Component, OnInit } from "@angular/core";
import { TitleTagService } from "src/app/services/title-tag-service.service";
import { XmlToJsonService } from "src/app/services/xml-to-json.service";
import { StuffDiscripiton } from "../stuff-description/stuff-description.component";

@Component({
  selector: "app-air-index",
  templateUrl: "./air-index.component.html",
  styleUrls: ["./air-index.component.css"],
})
export class AirIndexComponent implements OnInit {
  images!: StuffDiscripiton[];
  constructor(
    public xmlToJsonService: XmlToJsonService,
    private titleTagService: TitleTagService
  ) { }

  ngOnInit() {
    this.titleTagService.setTitle(
      "Best way to getting rid of indoor air pollution | Freekagyan online - A Consulting Services"
    );

    this.titleTagService.setSocialMediaTags(
      location.href,
      "Blogs | Freekagyan online - A Consulting Services",
      `Did you know that air pollution can happen both inside buildings and outdoors?
      Get the facts how air pollution effects your health.`,
      "air-polution.jpg"
    );

    this.xmlToJsonService.loadXML().subscribe((data: string) => {
      this.xmlToJsonService.parseXML(data).then((data: StuffDiscripiton[]) => {
        this.images = data;
      });
    });

  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
