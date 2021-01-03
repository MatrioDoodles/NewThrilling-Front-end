import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ENTITY_URL, Product, ProductService} from "../../../services/products/product.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";
import {API_URL} from "../../../app.const";

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  displayedColumns: string[] = ['picture','label','reference','prixVente', 'prixProd','dateExp','qte','qteAppro','actions'];
  Products:MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Productsdat:Product[];
  ProductType;
  btnname:string;

  constructor(private ProductService:ProductService,
              private route:Router,
              private router: ActivatedRoute) {
  }

  ngOnInit(): void {

      this.RetrieveAllProducts();
  }

  applyFilterClient(filterValue: string) {
    filterValue = filterValue.trim() // Remove whitespace
    filterValue = filterValue.toLowerCase() // Datasource defaults to lowercase matches
    this.Products.filter = filterValue
  }

  RetrieveAllProducts(){
      this.ProductService.getAllProducts().
      subscribe(
        (data: any) => {
          this.Productsdat = data
          for(let i=0;i<this.Productsdat.length;i++)
          {
            this.Productsdat[i].picture = `${API_URL}/products/img/${ this.Productsdat[i].id}`;
          }
          //this.Products = new MatTableDataSource(data);
          setTimeout(() => {
            this.Products = new MatTableDataSource(this.Productsdat);
            this.Products.paginator = this.paginator;
            this.Products.sort = this.sort; });
        }
      )}
  Modifier(SelectedProduct:Product){
    this.route.navigate(['addProduct',SelectedProduct.id])
  }
  Supprimer(SelectedProduct){
    this.ProductService.deleteProductById(SelectedProduct).
    subscribe(
      response => this.RetrieveAllProducts()
    );
  }

}
