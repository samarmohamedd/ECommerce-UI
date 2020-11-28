import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IStock } from 'src/app/Interfaces/IStock';
import { PublicService } from 'src/app/public-service.service';

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit, AfterViewInit {


  closeResult: string = '';

  displayedColumns: string[] = [
    'Id',
    'Name',
    'Vendor_Name',
    'Address',
    'Description',
    'Delete',
  ];
  dataSource!: MatTableDataSource<IStock>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  Stocks: any;
  StockObject: IStock = {
    Name: "",
    Description: "",
    Vendor_Id: 0,
    Address: "",
    Vendor_Name: ""
  };
  Vendors: any;

  constructor(
    private _PublicService: PublicService
    , private modalService: NgbModal) {

  }
  ngAfterViewInit() {
    this.getAllStocks();
  }
  ngOnInit(): void {
    this.getAllVendors();
  }
  getAllStocks() {
    this._PublicService.getAll("Stock", 'ViewGetAll').subscribe(res => {
      this.Stocks = res;
      this.dataSource = new MatTableDataSource<IStock>(this.Stocks);
      this.dataSource.paginator = this.paginator;
    });

  }
  getAllVendors() {
    this._PublicService.getAll("Vendor", 'ViewGetAll').subscribe(res => {
      this.Vendors = res;
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
