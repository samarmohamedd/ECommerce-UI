import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/Interfaces/ICategory';
import { PublicService } from 'src/app/public-service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  Categories: any;
  CategoryObject: ICategory = {
    Name: "",
    ParentName: "",
    Descripton: "",
  };
  Name: any;
  ParentName: any;
  Descripton: any;
  deleteImage: boolean = false;
  message: any;
  constructor(
    private _PublicService: PublicService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  AddCategory() {

    debugger;
    this._PublicService.Add('Category', 'AddData', this.CategoryObject).subscribe((Response) => {
      this.Categories = Response;
      this._router.navigate(['/Category']);

    });

  }

  imagePath: any;
  url: any;
  doucmentName: any;
  onFileChanged(event: any) {
    debugger;
    const files = event.target.files;
    if (files.length === 0)
      return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    debugger;

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
    this.deleteImage = true;

    debugger;
  }
  RemoveImage() {
    debugger;
    this.url = null;
    this.deleteImage = false

  }
}
