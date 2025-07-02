import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = []; //Inicia uma matriz de Produtos
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  constructor(private productService: ProductService,            
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }


  listProducts() {  
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode){
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
    
  }

  handleSearchProducts(){
    const theKeyord: string = this.route.snapshot.paramMap.get('keyword')!;

    //search for the product using the keyword
    this.productService.searchProducts(theKeyord).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  handleListProducts(){
    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      //get the "id" param string. convert string to a number using the "+".
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!; 
    }
    else{
      this.currentCategoryId = 1;
    }
    
                                      //"invoca" o metodo para ser usado
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data; //Atribuindo os dados à matriz
      }
    )
  }

}
