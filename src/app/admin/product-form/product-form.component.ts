import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { map } from 'rxjs/operators';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators'
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product: any = {};
  id;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    // take - Emits only the first count values emitted by the source Observable.
    // so no need to unsubscribe. Full documentation at https://rxjs-dev.firebaseapp.com/api/operators/take 
    if (this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
  }

  ngOnInit(): void {
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(confirm('Are you sure your want to delete this product?')){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }
}
