import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from "../../../../services/products/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Category, CategoryService} from "../../../../services/categories/category.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  Product: Product
  Productresp:Product
  ProductType;
  cat:Category[];
  currentFile: File;
  btnname: string
  constructor(private route: ActivatedRoute,
              private ProductService: ProductService,
              private router: Router,
              private categoryService:CategoryService) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.params['updateElement'] === '0') {
      this.Product = new Product(null, '','', null,
        null, '', null,
        true,null,null,'',null,new Category(null,'',''))
      this.btnname = "Ajouter"

    }

    else {
      this.ProductService.getProductById(this.route.snapshot.params['updateElement']).
      subscribe(
        (data: any) => {
          this.Product = data;
        }
      )
      this.btnname = "Modifier"
    }
    this.categoryService.getAllCategories().subscribe(
      (response:Category[]) => {
        setTimeout(()=>{
          this.cat = response;
          console.log(this.cat)
        })
      }
    )
  }
  onFileChange(event){
    this.currentFile = event.target.files[0];
  }
  submit() {
    if (this.route.snapshot.params['updateElement'] === "0") {
      this.ProductService.AddProduct(this.Product).subscribe(
        (resp:Product) => {
          this.Productresp=resp
          setTimeout(() => {
            if(this.currentFile!=null){
              this.ProductService.upload(this.currentFile,this.Productresp.id).subscribe()
              this.router.navigate(['listProducts']);}})}

      );

    }
    else {
      this.ProductService.UpdateProductBYid(this.Product).subscribe(
        (resp:Product) => {this.Productresp=resp
          setTimeout(() => {
            if(this.currentFile!=null){
              this.ProductService.upload(this.currentFile,this.Productresp.id).subscribe()
              this.router.navigate(['listProducts']);}})})}


  }
  logSelection()
  {
    console.log(this.Product.category)
  }

}
