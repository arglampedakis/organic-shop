import { ProductService } from './../../product.service';
import { map } from 'rxjs/operators';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;

  constructor(categoryService: CategoryService, private productService: ProductService) {
    this.categories$ = categoryService.getCategories();
   }

  ngOnInit(): void {
  }

  save(product){
    this.productService.create(product);
  }
}
