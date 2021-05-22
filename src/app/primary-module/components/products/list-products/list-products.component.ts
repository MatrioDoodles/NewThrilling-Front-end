import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ENTITY_URL, Product, ProductService} from "../../../../services/products/product.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";
import {API_URL} from "../../../../app.const";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmAnnulationComponent} from "../../misc/confirm-annulation/confirm-annulation.component";

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  displayedColumns: string[] = ['picture','label','reference','prixVente', 'prixProd','dateExp','qte','qteAppro','actions'];
  Products:Product[];
  ProductType;
  btnname:string;
  loading: boolean = true;

  constructor(private ProductService:ProductService,
              private route:Router,
              private router: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {

      this.RetrieveAllProducts();
      this.loading = false;
  }


  RetrieveAllProducts(){
      this.ProductService.getAllProducts().
      subscribe(
        (data: any) => {
          this.Products = data
          for(let i=0;i<this.Products.length;i++)
          {
            this.Products[i].picture = `${API_URL}/products/img/${ this.Products[i].id}`;
          }
        }
      )}
  Modifier(SelectedProduct:Product){
    this.route.navigate(['addProduct',SelectedProduct.id])
  }
  Supprimer(SelectedProduct){
    let choice;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data ={
      msg:"Etes vous sure de vouloir supprimer le Produit " + SelectedProduct.label
    }
    const dialogRef = this.dialog.open(ConfirmAnnulationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        choice = data
        if(choice != null && choice != undefined) {
          this.ProductService.deleteProductById(SelectedProduct).
          subscribe(
            response => this.RetrieveAllProducts()
          );
        }
      }
    );

  }




}
