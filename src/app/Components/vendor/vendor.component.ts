import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IVendor } from 'src/app/Interfaces/IVendor';
import { PublicService } from 'src/app/public-service.service';

@Component({
  selector: 'vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit, AfterViewInit {


  closeResult: string = '';

  displayedColumns: string[] = [
    'Id',
    'Name',
    'Company_Name',
    'Address',
    'Phone',
    'Nationality',
    'Description',
    'Delete',
  ];
  dataSource!: MatTableDataSource<IVendor>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  Vendors: any;
  VendorObject: IVendor = {
    Name: "",
    Description: "",
    Company_Name: "",
    Nationality: "",
    Address: "",
    Phone: 0
  };
  constructor(
    private _PublicService: PublicService
    , private modalService: NgbModal) {

  }
  ngAfterViewInit() {
    this.getAllVendors();
  }

  ngOnInit(): void {
  }
  getAllVendors() {
    this._PublicService.getAll("Vendor", 'ViewGetAll').subscribe(res => {
      this.Vendors = res;
      this.dataSource = new MatTableDataSource<IVendor>(this.Vendors);
      this.dataSource.paginator = this.paginator;
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
    this.VendorObject = {
      Name: "",
      Description: "",
      Company_Name: "",
      Nationality: "",
      Address: "",
      Phone: 0
    };
  }
  AddVendor() {

    debugger;
    this._PublicService.Add('Vendor', 'AddData', this.VendorObject).subscribe((Response) => {
      this.modalService.dismissAll();
      this.getAllVendors();
      this.ClearData();
    });

  }
  //Edit Modal
  updateVendor(Object: any) {

    this._PublicService.Update('Vendor', 'UpdateData', Object).subscribe((Response) => {
      this.Vendors = Response;
      this.modalService.dismissAll();
      this.getAllVendors();
      this.ClearData();


    });

  }
  openEditModal(content: any, Id: any) {
    const result: IVendor = this.Vendors.find((obj: any) => obj.Id === Id);
    this.VendorObject = result;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  //Delete Modal
  DeleteVendor(Object: any) {
    debugger;
    this._PublicService.Delete("Vendor", 'DeleteData', Object.Id).subscribe((Response) => {
      this.modalService.dismissAll();
      this.getAllVendors();
    });

  }
  openDeleteModal(content: any, Object: any) {
    debugger;

    const result: IVendor = this.Vendors.find((obj: any) => obj.Id === Object.Id);
    this.VendorObject = result;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

}
