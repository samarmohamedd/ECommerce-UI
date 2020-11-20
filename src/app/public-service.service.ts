import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PublicServiceService {
  Url : string="https://localhost:44307/api/category/";

  constructor(
    private _Http : HttpClient
    ) { }

    getAll(){
     return this._Http.get(this.Url).subscribe(x=>x);
    }
}
