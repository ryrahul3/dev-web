import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleTagService {
  private urlMeta: string = "og:url";
  private titleMeta: string = "og:title";
  private descriptionMeta: string = "og:description";
  private description: string = "description";
  private imageMeta: string = "og:image";
  private secureImageMeta: string = "og:image:secure_url";
  private keywords: string = "keywords";


  constructor(private titleService: Title, private metaService: Meta) { }

  public setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  public setSocialMediaTags(url: string, title: string, description: string, image: string, keywords?: string): void {
    var imageUrl = `https://4cb.online/assets/imgages/${image}`;
    var tags = [
      new MetaTag(this.urlMeta, url, true),
      new MetaTag(this.titleMeta, title, true),
      new MetaTag(this.descriptionMeta, description, true),
      new MetaTag(this.imageMeta, imageUrl, true),
      new MetaTag(this.secureImageMeta, imageUrl, true),
      new MetaTag(this.description, description, false),
      new MetaTag(this.keywords, keywords??"", false)
    ];
    this.setTags(tags);
  }

  private setTags(tags: MetaTag[]): void {
    tags.forEach(siteTag => {
      const tag = siteTag.isFacebook ? this.metaService.getTag(`property='${siteTag.name}'`) : this.metaService.getTag(`name='${siteTag.name}'`);
      if (siteTag.isFacebook) {
        this.metaService.updateTag({ property: siteTag.name, content: siteTag.value });
      } else {
        this.metaService.updateTag({ name: siteTag.name, content: siteTag.value });
      }
    });
  }
}

export class MetaTag {
  name: string;
  value: string;
  isFacebook: boolean;

  constructor(name: string, value: string, isFacebook: boolean) {
    this.name = name;
    this.value = value;
    this.isFacebook = isFacebook;
  }
}