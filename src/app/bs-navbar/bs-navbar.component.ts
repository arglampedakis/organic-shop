import { Observable } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {

  }

  async ngOnInit() {
    //no need to unsubscribe from this because there will be only one instance of the navbar in DOM
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }
}
