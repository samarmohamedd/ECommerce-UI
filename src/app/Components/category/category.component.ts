import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ICategory } from '../../Interfaces/ICategory';
import { PublicService } from 'src/app/Services/Public.Service/public-service.service';
import { ToasterService } from 'src/app/Services/Toaster.Service/toaster.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { group } from '@angular/animations';
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

  AddForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required)
  })


  EditForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required)
  })

  get AddName() {
    return this.AddForm.get("Name");
  }
  get AddDescription() {
    return this.AddForm.get("Description");
  }

  get EditName() {
    return this.EditForm.get("Name");
  }
  get EditDescription() {
    return this.EditForm.get("Description");
  }

  displayedColumns: string[] = [
    'Id',
    'ParentName',
    'Name',
    'Descripton',
    'Delete'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<ICategory>;
  durationInSeconds = 5;

  constructor(
    private _PublicService: PublicService
    , private modalService: NgbModal
    , private _ToasterService: ToasterService) {

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
      this._ToasterService.FireMessagePopUp(1);
    }, (error) => {
      this._ToasterService.FireMessagePopUp(2);
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
    }, (error) => {
      this._ToasterService.FireMessagePopUp(2);
    });

  }
  openEditModal(content: any, Id: any) {
    const result: ICategory = this.Categories.find((obj: any) => obj.Id === Id);
    debugger;
    this.CategoryObject = result;
    debugger;

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
    }, (error) => {
      this._ToasterService.FireMessagePopUp(2);
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
  closeResult: string = '';
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    })
  }


}
