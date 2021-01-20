import { map } from 'rxjs/operators';
import { CategoryService } from 'shared/services/category.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent{

  @Input('category') category;
  categories$;

  constructor(categoryService: CategoryService) {

    this.categories$ = categoryService.getAll().pipe(
      map(categories => categories.map(
        category => category
      ))
    );
  }

}
