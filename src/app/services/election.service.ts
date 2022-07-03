import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ElectionService {

constructor(private _http: HttpClient) { }

fetchElectionCount(){
  return this._http.get('https://results.eci.gov.in/ResultAcGenMar2022/partywiseresult-S24.htm?st=S24')
}
}
