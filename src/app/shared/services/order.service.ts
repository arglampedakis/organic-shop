import { map } from 'rxjs/operators';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list("/orders").valueChanges();
  }

  getOrdersByUserId(userId: string) {
    return this.db
      .list("/orders", ref => ref.orderByChild("userId").equalTo(userId))
      .valueChanges();
  }
}
