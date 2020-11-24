import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProduct } from 'src/app/Interfaces/IProduct';
import { PublicService } from 'src/app/public-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  closeResult: string = '';

  displayedColumns: string[] = [
    'Id',
    'Name',
    'Description',
    'CategoryName',
    'BrandName',
    'Delete',
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Products: any;
  ProductObject: IProduct = {
    Name: "",
    Description: "",
    CategoryId: 0,
    BrandId: 0,
    BrandName: "",
    CategoryName: "",
  };
  Categories: any;
  Brands: any;


  syncPrimaryPaginator(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.paginator.page.emit(event);
  }
  constructor(
    private _PublicService: PublicService
    , private modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllBrands();
    this.getAllCategories();

  }
  getAllProducts() {
    this._PublicService.getAll("Product", 'ViewGetAll').subscribe(res => {
      this.Products = res;
      debugger;
      // this.dataSource = new MatTableDataSource<PeriodicElement>(this.Products);

    });

  }
  getAllCategories() {
    this._PublicService.getAll("Category", 'ViewGetAll').subscribe(res => {
      this.Categories = res;
      // this.dataSource = new MatTableDataSource<PeriodicElement>(this.Categories);

    });

  }
  getAllBrands() {
    this._PublicService.getAll("Brand", 'ViewGetAll').subscribe(res => {
      this.Brands = res;
      debugger;
    });

  }

  //add 
  openAddModal(content: any) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }
  ClearData() {
    this.ProductObject = {
      Name: "",
      Description: "",
      BrandId: 0,
      CategoryId: 0,
      CategoryName: "",
      BrandName: ""
    };
  }
  AddProduct() {

    debugger;
    this._PublicService.Add('Product', 'AddData', this.ProductObject).subscribe((Response) => {
      this.modalService.dismissAll();
      this.getAllProducts();
      this.ClearData();
    });

  }
  //Edit Modal
  updateProduct(Object: any) {

    this._PublicService.Update('Product', 'UpdateData', Object).subscribe((Response) => {
      this.Products = Response;
      this.modalService.dismissAll();
      this.getAllProducts();
      this.ClearData();


    });

  }
  openEditModal(content: any, Id: any) {
    const result: IProduct = this.Products.find((obj: any) => obj.Id === Id);
    this.ProductObject = result;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  //Delete Modal
  DeleteProduct(Object: any) {
    debugger;
    this._PublicService.Delete("Product", 'DeleteData', Object.Id).subscribe((Response) => {
      this.modalService.dismissAll();
      this.getAllProducts();
    });

  }
  openDeleteModal(content: any, Object: any) {
    debugger;

    const result: IProduct = this.Products.find((obj: any) => obj.Id === Object.Id);
    this.ProductObject = result;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

}
