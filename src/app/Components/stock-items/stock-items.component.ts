import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IStockItems } from 'src/app/Interfaces/IStockItems';
import { PublicService } from 'src/app/Services/Public.Service/public-service.service';
import { ToasterService } from 'src/app/Services/Toaster.Service/toaster.service';

@Component({
  selector: 'stock-items',
  templateUrl: './stock-items.component.html',
  styleUrls: ['./stock-items.component.css']
})
export class StockItemsComponent implements OnInit, AfterViewInit {


  closeResult: string = '';

  displayedColumns: string[] = [
    'Id',
    'Stock_Name',
    'Product_Name',
    'Description',
    'Quantity',
    'Size',
    'Price',
    'Delete',
  ];
  dataSource!: MatTableDataSource<IStockItems>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  StockItemss: any;
  StockItemsObject: IStockItems = {
    Size: "",
    Stock_Id: 0,
    Product_Id: 0,
    Stock_Name: "",
    Product_Name: "",
    Price: 0,
    Quantity: 0,
    Id: 0,
    Description: "",
    Image_Name: ""
  };

  Stocks: any;
  Products: any;
  message: string = '';
  ImageName: string = '';
  constructor(
    private _PublicService: PublicService
    , private modalService: NgbModal
    , private _ToasterService: ToasterService) {

  }
  ngAfterViewInit() {
    this.getAllStockItems();
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllStocks();

  }
  getAllStockItems() {
    this._PublicService.getAll("StockItems", 'ViewGetAll').subscribe(res => {
      this.StockItemss = res;
      debugger;
      this.dataSource = new MatTableDataSource<IStockItems>(this.StockItemss);
      this.dataSource.paginator = this.paginator;
    });

  }
  getAllProducts() {
    this._PublicService.getAll("Product", 'ViewGetAll').subscribe(res => {
      this.Products = res;
    });

  }
  getAllStocks() {
    this._PublicService.getAll("Stock", 'ViewGetAll').subscribe(res => {
      this.Stocks = res;
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
      Id: 0,
      Description: "",
      Image_Name: ""
    };
  }
  AddStockItems() {

    this.StockItemsObject.Image_Name = this.ImageName;
    this._PublicService.Add('StockItems', 'AddData', this.StockItemsObject).subscribe((Response) => {
      this.modalService.dismissAll();
      this.getAllStockItems();
      this.ClearData();
    });

  }
  doucmentName: any;
  onFileChanged(event: any) {
    const file = event.target.files[0];
    this.ImageName = file.name;
    this._PublicService.uploadFile('StockItems', 'UplouadImage', file).subscribe();

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

    this._PublicService.Delete("StockItems", 'DeleteData', Object.Id).subscribe((Response) => {
      this.modalService.dismissAll();
      this.getAllStockItems();
    });

  }
  openDeleteModal(content: any, Object: any) {


    const result: IStockItems = this.StockItemss.find((obj: any) => obj.Id === Object.Id);
    this.StockItemsObject = result;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

}
