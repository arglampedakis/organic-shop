import { Product } from 'shared/models/product';
import { map } from 'rxjs/operators';
import { ProductService } from 'shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().pipe(
      map( actions => actions.map(
        action => {
          const $key = action.payload.key;
          const data = { $key, ...action.payload.val() as Product };
          this.dtTrigger.next();
          return data;
        }
      ))
    ).subscribe(products => this.products = this.filteredProducts = products);
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      retrieve: true
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query) ? 
      this.products.filter( p => p.title.toLowerCase().includes(query.toLowerCase())) :
       this.products;
  }
}

