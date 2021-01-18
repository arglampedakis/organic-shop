import { take } from 'rxjs/operators';
import { Product } from './models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cardId: string) {
    return this.db.object('/shopping-carts/' + cardId);
  }

  private async getOrCreateCartId() {
    let cardId = localStorage.getItem('cardId');
    if (cardId) return cardId;

    let result = await this.create();
    localStorage.setItem('cardId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/' + cartId + "/items/" + product.$key);

    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.val())
        item$.update({ quantity: item.payload.val().quantity + 1 });
      else
        item$.set({
          product: {
            title: product.title,
            category: product.category,
            imageUrl: product.imageUrl,
            price: product.price
          }, quantity: 1
        });
    })
  }
}
