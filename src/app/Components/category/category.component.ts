import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ICategory } from '../../Interfaces/ICategory';
import { PublicService } from '../../public-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, AfterViewInit {
  Categories: any;
  CategoryObject: ICategory = {
    Name: "",
    ParentName: "",
    Descripton: "",
  };

  closeResult: string = '';

  displayedColumns: string[] = [
    'Id',
    'ParentName',
    'Name',
    'Descripton',
    'Delete'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<ICategory>;


  constructor(
    private _PublicService: PublicService
    , private modalService: NgbModal) {

  }
  ngAfterViewInit() {

    this.getAllCategories();

  }
  ngOnInit(): void {
  }
  getAllCategories() {
    this._PublicService.getAll("Category", 'ViewGetAll').subscribe(res => {
      this.Categories = res;
      this.dataSource = new MatTableDataSource<ICategory>(this.Categories);
      this.dataSource.paginator = this.paginator;
    });

  }
  //Add modal
  AddCategory() {
    this._PublicService.Add('Category', 'AddData', this.CategoryObject).subscribe((Response) => {
      this.modalService.dismissAll();
      this.getAllCategories();
    });
  }

  openAddModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }
  //Edit Modal
  updateCategory(Object: any) {
    this._PublicService.Update('Category', 'UpdateData', Object).subscribe((Response) => {
      this.Categories = Response;
      this.modalService.dismissAll();
      this.getAllCategories();
    });

  }
  openEditModal(content: any, Id: any) {
    const result: ICategory = this.Categories.find((obj: any) => obj.Id === Id);
    this.CategoryObject = result;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  //Delete Modal
  DeleteCategory(Object: any) {

    this._PublicService.Delete("Category", 'DeleteData', Object.Id).subscribe((Response) => {
      this.modalService.dismissAll();
      this.getAllCategories();
    });

  }
  openDeleteModal(content: any, Object: any) {


    const result: ICategory = this.Categories.find((obj: any) => obj.Id === Object.Id);
    this.CategoryObject = result;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  //

}
