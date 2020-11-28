import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IStockItems } from 'src/app/Interfaces/IStockItems';
import { PublicService } from 'src/app/public-service.service';

@Component({
  selector: 'stock-items',
  templateUrl: './stock-items.component.html',
  styleUrls: ['./stock-items.component.css']
})
export class StockItemsComponent implements OnInit {


  closeResult: string = '';

  displayedColumns: string[] = [
    'Id',
    'Stock_Name',
    'Product_Name',
    'Quantity',
    'Size',
    'Price',
    'Delete',
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  StockItemss: any;
  StockItemsObject: IStockItems = {
    Size: "",
    Stock_Id: 0,
    Product_Id: 0,
    Stock_Name: "",
    Product_Name: "",
    Price: 0,
    Quantity: 0,
    Id: 0
  };

  Stocks: any;
  Products: any;


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
    this.getAllStockItems();
    this.getAllProducts();
    this.getAllStocks();

  }
  getAllStockItems() {
    this._PublicService.getAll("StockItems", 'ViewGetAll').subscribe(res => {
      this.StockItemss = res;
      debugger;
      // this.dataSource = new MatTableDataSource<PeriodicElement>(this.StockItemss);

    });

  }
  getAllProducts() {
    this._PublicService.getAll("Product", 'ViewGetAll').subscribe(res => {
      this.Products = res;
      debugger;
    });

  }
  getAllStocks() {
    this._PublicService.getAll("Stock", 'ViewGetAll').subscribe(res => {
      this.Stocks = res;
      debugger;
      // this.dataSource = new MatTableDataSource<PeriodicElement>(this.Stocks);

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
    this.StockItemsObject = {
      Size: "",
      Stock_Id: 0,
      Product_Id: 0,
      Stock_Name: "",
      Product_Name: "",
      Price: 0,
      Quantity: 0,
      Id: 0
    };
  }
  AddStockItems() {

    debugger;
    this._PublicService.Add('StockItems', 'AddData', this.StockItemsObject).subscribe((Response) => {
      this.modalService.dismissAll();
      this.getAllStockItems();
      this.ClearData();
    });

  }
  //Edit Modal
  updateStockItems(Object: any) {

    this._PublicService.Update('StockItems', 'UpdateData', Object).subscribe((Response) => {
      this.StockItemss = Response;
      this.modalService.dismissAll();
      this.getAllStockItems();
      this.ClearData();


    });

  }
  openEditModal(content: any, Id: any) {
    const result: IStockItems = this.StockItemss.find((obj: any) => obj.Id === Id);
    this.StockItemsObject = result;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  //Delete Modal
  DeleteStockItems(Object: any) {
    debugger;
    this._PublicService.Delete("StockItems", 'DeleteData', Object.Id).subscribe((Response) => {
      this.modalService.dismissAll();
      this.getAllStockItems();
    });

  }
  openDeleteModal(content: any, Object: any) {
    debugger;

    const result: IStockItems = this.StockItemss.find((obj: any) => obj.Id === Object.Id);
    this.StockItemsObject = result;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

}
