import { switchMap } from 'rxjs/operators';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'shared/models/order';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  orders: Array<Order>;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.subscription = this.authService.user$
      .pipe(
        switchMap(user => this.orderService.getOrdersByUserId(user.uid))
      )
      .subscribe((orders: Array<Order>) => this.orders = orders);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
