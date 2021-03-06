import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {

    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
        //we ensure that the itemsMap will be initialized properly (not null etc.)
        itemsMap = itemsMap || {};

        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem({ ...item, $key: productId }));
        }
    }

    public getQuantity(product: Product) {
        const filteredProd = this.items.filter(item => item.$key === product.$key);
        return filteredProd.length === 1 ? filteredProd[0].quantity : 0;
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items)
            sum += this.items[productId].totalPrice;
        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        for (let product of this.items)
            count += product.quantity;
        return count;
    }
}