import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as convert from "xml-js";
import { StuffDiscripiton } from "src/app/features/blogs/stuff-description/stuff-description.component";


@Injectable({
  providedIn: "root",
})
export class XmlToJsonService {
  constructor(
    private _http: HttpClient
  ) { }

  loadXML() {
    return this._http.get("/assets/data/indoor-plants.xml", {
      headers: new HttpHeaders()
        .set("Content-Type", "text/xml")
        .append("Access-Control-Allow-Methods", "GET")
        .append("Access-Control-Allow-Origin", "*")
        .append(
          "Access-Control-Allow-Headers",
          "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"
        ),
      responseType: "text",
    });
  }

  parseXML(data: string): Promise<StuffDiscripiton[]> {
    return new Promise((resolve) => {
      const obj = convert.xml2json(data, { compact: true, spaces: 4 });
      const json = JSON.parse(obj);
      resolve(json.image.stuffDescription);
    });
  }
  fetchBankInfobyIfsc(ifsc:string) {
    return this._http.get(`https://ifsc.razorpay.com/${ifsc}`);
  }
}
