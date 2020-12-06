import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IBrand } from 'src/app/Interfaces/IBrand';
import { PublicService } from 'src/app/Services/Public.Service/public-service.service';
import { ToasterService } from 'src/app/Services/Toaster.Service/toaster.service';

@Component({
  selector: 'brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit, AfterViewInit {
  Brands: any;
  Loader: boolean = true;
  value = 'Clear me';
  BrandObject: IBrand = {
    Name: "",
    Descripton: "",
  };
  displayedColumns: string[] = [
    'Id',
    'Name',
    'Descripton',
    'Delete'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<IBrand>;

  closeResult: string = '';

  constructor(private _PublicService: PublicService
    , private modalService: NgbModal
    , private _ToasterService: ToasterService) { }
  ngAfterViewInit() {

    this.getAllBrands();

  }
  ngOnInit(): void {

  }


  getAllBrands() {
    this._PublicService.getAll("Brand", 'ViewGetAll').subscribe(res => {
      this.Brands = res;
      this.dataSource = new MatTableDataSource<IBrand>(this.Brands);
      this.dataSource.paginator = this.paginator;
      this.Loader = false;

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
      this._ToasterService.FireMessagePopUp(1);
    }, (error) => {
      this._ToasterService.FireMessagePopUp(2);
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
      this.modalService.dismissAll();
      this.getAllBrands();
      this._ToasterService.FireMessagePopUp(1);
    }, (error) => {
      this._ToasterService.FireMessagePopUp(2);
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
