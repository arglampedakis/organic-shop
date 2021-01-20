import { Subscription } from 'rxjs';
import { OrderService } from 'shared/services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'shared/models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {

  orders: Array<Order>;
  subscription: Subscription;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.subscription = this.orderService.getOrders()
      .subscribe((orders: Array<Order>) => this.orders = orders);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
