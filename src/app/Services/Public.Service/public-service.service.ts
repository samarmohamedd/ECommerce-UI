import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PublicService {
  BaseUrl: string = "https://localhost:44307/api/";

  constructor(
    private _Http: HttpClient
  ) { }

  getAll(ControllerName: any, MethodName: any) {
    return this._Http.get(this.BaseUrl + ControllerName + '/' + MethodName).pipe(x => x);
  }

  Add(ControllerName: any, MethodName: any, Object: any) {
    return this._Http.post(this.BaseUrl + ControllerName + '/' + MethodName, Object).pipe(x => x);
  }

  Delete(ControllerName: any, MethodName: any, Id: number) {
    return this._Http.delete(this.BaseUrl + ControllerName + '/' + MethodName + '?id=' + Id).pipe(x => x);
  }

  Update(ControllerName: any, MethodName: any, Object: any) {
    return this._Http.put(this.BaseUrl + ControllerName + '/' + MethodName, Object).pipe(x => x);
  }

  UploadFile(ControllerName: any, MethodName: any, Object: any) {
    return this._Http.post(this.BaseUrl + ControllerName + '/' + MethodName, Object).pipe(x => x);
  }
}
