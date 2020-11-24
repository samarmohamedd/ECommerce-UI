import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IStock } from 'src/app/Interfaces/IStock';
import { PublicService } from 'src/app/public-service.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {


  closeResult: string = '';

  displayedColumns: string[] = [
    'Id',
    'Name',
    'Vendor_Name',
    'Address',
    'Description',
    'Delete',
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Stocks: any;
  StockObject: IStock = {
    Name: "",
    Description: "",
    Vendor_Id: 0,
    Address: "",
    Vendor_Name: ""
  };
  Vendors: any;


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
    this.getAllStocks();
    this.getAllVendors();
  }
  getAllStocks() {
    this._PublicService.getAll("Stock", 'ViewGetAll').subscribe(res => {
      this.Stocks = res;
      debugger;
      // this.dataSource = new MatTableDataSource<PeriodicElement>(this.Stocks);

    });

  }
  getAllVendors() {
    this._PublicService.getAll("Vendor", 'ViewGetAll').subscribe(res => {
      this.Vendors = res;
      debugger;
      // this.dataSource = new MatTableDataSource<PeriodicElement>(this.Vendors);

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
    this.StockObject = {
      Name: "",
      Description: "",
      Vendor_Id: 0,
      Address: "",
      Vendor_Name: ""
    };
  }
  AddStock() {

    debugger;
    this._PublicService.Add('Stock', 'AddData', this.StockObject).subscribe((Response) => {
      this.modalService.dismissAll();
      this.getAllStocks();
      this.ClearData();
    });

  }
  //Edit Modal
  updateStock(Object: any) {

    this._PublicService.Update('Stock', 'UpdateData', Object).subscribe((Response) => {
      this.Stocks = Response;
      this.modalService.dismissAll();
      this.getAllStocks();
      this.ClearData();


    });

  }
  openEditModal(content: any, Id: any) {
    const result: IStock = this.Stocks.find((obj: any) => obj.Id === Id);
    this.StockObject = result;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  //Delete Modal
  DeleteStock(Object: any) {
    debugger;
    this._PublicService.Delete("Stock", 'DeleteData', Object.Id).subscribe((Response) => {
      this.modalService.dismissAll();
      this.getAllStocks();
    });

  }
  openDeleteModal(content: any, Object: any) {
    debugger;

    const result: IStock = this.Stocks.find((obj: any) => obj.Id === Object.Id);
    this.StockObject = result;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

}
