import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IBrand } from 'src/app/Interfaces/IBrand';
import { PublicService } from 'src/app/public-service.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  Brands: any;
  BrandObject: IBrand = {
    Name: "",
    Descripton: "",
  };
  closeResult: string = '';

  constructor(private _PublicService: PublicService
    , private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllBrands();

  }


  getAllBrands() {
    this._PublicService.getAll("Brand", 'ViewGetAll').subscribe(res => {
      this.Brands = res;
      debugger;
    });

  }
  getDimensionsByFind(id: number) {
    debugger;
  }


  DeleteBrand(Object: any) {
    debugger;
    this._PublicService.Delete("Brand", 'DeleteData', Object.Id).subscribe((Response) => {
      this.modalService.dismissAll();
      this.getAllBrands();
    });

  }

  updateBrand(Object: any) {
    debugger;
    this._PublicService.Update('Brand', 'UpdateData', Object).subscribe((Response) => {
      this.Brands = Response;
      this.modalService.dismissAll();
      this.getAllBrands();

    });

  }
  openAddModal(content: any) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }
  AddBrand() {

    debugger;
    this._PublicService.Add('Brand', 'AddData', this.BrandObject).subscribe((Response) => {
      this.getAllBrands();
    });

  }
  openEditModal(content: any, Id: any) {
    const result: IBrand = this.Brands.find((obj: any) => obj.Id === Id);
    this.BrandObject = result;
    debugger;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

  openDeleteModal(content: any, Id: any) {
    const result: IBrand = this.Brands.find((obj: any) => obj.Id === Id);
    this.BrandObject = result;
    debugger;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }

}
