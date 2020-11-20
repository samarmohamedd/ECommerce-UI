import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../../Interfaces/ICategory';
import { PublicServiceService } from '../../public-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  Categories: any;
  CategoryObject: ICategory = {
    Name: "",
    ParentName: "",
    Descripton: "",
  };
  Name: string = "";


  Url: string = "https://localhost:44307/api/category/";

  constructor(
    private _Http: HttpClient,
    private _PublicService: PublicServiceService) {

  }

  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories() {
    this._Http.get(this.Url + 'ViewGetAll').subscribe((Response) => {
      this.Categories = Response
    });

  }

  AddCategory() {
    this._Http.post(this.Url + 'AddData', this.CategoryObject).subscribe((Response) => {
      this.Categories = Response;
      this.getAllCategories();
    });

  }
  DeleteCategory(Object: any) {
    debugger;
    this._Http.delete(this.Url + 'DeleteData' + '?id=' + Object.Id).subscribe((Response) => {
      this.getAllCategories();
    });

  }
  updateCategory(Object: any) {
    debugger;
    this._Http.put(this.Url, Object).subscribe((Response) => {
      this.getAllCategories();
    });

  }
}
