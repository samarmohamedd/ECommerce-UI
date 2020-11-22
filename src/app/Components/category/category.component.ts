import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../../Interfaces/ICategory';
import { PublicService } from '../../public-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  ParentName: string = "";

  checked: boolean = true;
  closeResult: string = '';



  constructor(
    private _PublicService: PublicService
    , private modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories() {
    this._PublicService.getAll("Category", 'ViewGetAll').subscribe(res => {
      this.Categories = res;
      debugger;
    });

  }
  getDimensionsByFind(id: number) {
    debugger;
  }


  DeleteCategory(Object: any) {
    debugger;
    this._PublicService.Delete("Category", 'DeleteData', Object.Id).subscribe((Response) => {
      this.getAllCategories();
    });

  }

  updateCategory(Object: any) {
    debugger;
    this._PublicService.Update('Category', 'UpdateData', Object).subscribe((Response) => {
      this.Categories = Response;

    });

  }
  openEditModal(content: any, Id: any) {
    const result: ICategory = this.Categories.find((obj: any) => obj.Id === Id);
    this.CategoryObject = result;
    debugger;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  openDeleteModal(content: any, Id: any) {
    const result: ICategory = this.Categories.find((obj: any) => obj.Id === Id);
    this.CategoryObject = result;
    debugger;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }
}
