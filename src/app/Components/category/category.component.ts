import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../../Interfaces/ICategory';
import { PublicService } from '../../public-service.service';

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
  checked: boolean = true;



  constructor(
    private _PublicService: PublicService) {

  }

  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories() {
    this._PublicService.getAll("Category", 'ViewGetAll').subscribe(res => {
      this.Categories = res;
    });

  }

  DeleteCategory(Object: any) {
    debugger;
    this._PublicService.Delete("Category", 'DeleteData', Object.Id).subscribe((Response) => {
      this.getAllCategories();
    });

  }
  updateCategory(Object: any) {
    debugger;
    this._PublicService.Update("Category", "UpdateData", Object).subscribe((Response) => {
      this.getAllCategories();
    });

  }
}
