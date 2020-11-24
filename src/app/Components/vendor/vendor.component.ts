import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IVendor } from 'src/app/Interfaces/IVendor';
import { PublicService } from 'src/app/public-service.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {


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
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Vendors: any;
  VendorObject: IVendor = {
    Name: "",
    Description: "",
    Company_Name: "",
    Nationality: "",
    Address: "",
    Phone: 0
  };


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
    this.getAllVendors();
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
