import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../services/orders.service';
import { ConsumersService } from '../services/consumers.service';
import { ProductsService } from '../services/products.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  orders = signal<any[]>([]);
  consumers = signal<any[]>([]);
  products = signal<any[]>([]);
  selectedOrder = signal<any>(null);
  selectedConsumerId: number | null = null;
  selectedProductId: number | null = null;
  selectedQuantity: number = 1;
  items: { product_id: number; quantity: number }[] = [];

  constructor(
    private ordersService: OrdersService,
    private consumersService: ConsumersService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.ordersService.getAll().subscribe({
      next: (data) => {
        this.orders.set(data);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });

    this.consumersService.getAll().subscribe({
      next: (data) => {
        this.consumers.set(data);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });

    this.productsService.getAll().subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  addItem(): void {
    if (this.selectedProductId === null){
      return;
    }
    this.items.push({ 
      product_id: this.selectedProductId, 
      quantity: this.selectedQuantity });

      this.selectedProductId = null;
      this.selectedQuantity = 1;
  }

  createOrder(): void {
    if (this.selectedConsumerId === null || this.items.length === 0) {
      return;
    }

    const newOrder = {
      consumer_id: this.selectedConsumerId,
      items: this.items
    };

    this.ordersService.create(newOrder).subscribe({
      next: () => {
        this.items = [];
        this.selectedConsumerId = null;
        this.ordersService.getAll().subscribe({
          next: (data) => { 
            this.orders.set(data);
          }
       });
    },
    error: (err) => {
      console.error('Error:', err);
    }
  });
  }

  viewOrder(id: number): void {
    this.ordersService.getById(id).subscribe({
      next: (data) => {
        this.selectedOrder.set(data);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
  
}