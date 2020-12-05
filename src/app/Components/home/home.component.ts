import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IStockItems } from 'src/app/Interfaces/IStockItems';
import { PublicService } from 'src/app/Services/Public.Service/public-service.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  StockItems: any;
  dataSource!: MatTableDataSource<IStockItems>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _PublicService: PublicService) { }

  ngOnInit(): void {
    this.getAllStockItems();
  }
  getAllStockItems() {
    this._PublicService.getAll("StockItems", 'ViewGetAll').subscribe(res => {
      this.StockItems = res;
      debugger;
      this.dataSource = new MatTableDataSource<IStockItems>(this.StockItems);
      this.dataSource.paginator = this.paginator;
    });

  }
}
