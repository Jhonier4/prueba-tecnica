import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  orders = signal<any[]>([]);

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.getAll().subscribe({
      next: (data) => {
        this.orders.set(data);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}