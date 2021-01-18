import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { map, switchMap } from 'rxjs/operators';
import { ProductService } from './../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService) {
    productService.getAll().pipe(
      switchMap(products => {
        this.products = products.map(product => ({ $key: product.key, ...product.payload.val() as Product }))
        return route.queryParamMap;
      })
    ).subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) :
        this.products;
    });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
