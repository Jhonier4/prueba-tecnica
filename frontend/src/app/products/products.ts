import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products = signal<any[]>([]);
  newName: string = '';
  newDescription: string = '';
  newPrice: number = 0;
  newStock: number = 0;

  editingId: number | null = null;
  editName: string = '';
  editDescription: string = '';
  editPrice: number = 0;
  editStock: number = 0;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getAll().subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  createProduct(): void {
    if (!this.newName || this.newPrice <= 0) {
      return;
    }

    const newProduct = {
      name: this.newName,
      description: this.newDescription,
      price: this.newPrice,
      stock: this.newStock
    };

    this.productsService.create(newProduct).subscribe({
      next: () => {
        this.newName = '';
        this.newDescription = '';
        this.newPrice = 0;
        this.newStock = 0;
        this.productsService.getAll().subscribe({
          next: (data) => this.products.set(data)
        });
      },
      error: (err) => console.error('Error:', err)
    });
  }

  deleteProduct(id: number): void {
    this.productsService.delete(id).subscribe({
      next: () => {
        this.productsService.getAll().subscribe({
          next: (data) => this.products.set(data)
        });
      },
      error: (err) => console.error('Error:', err)
    });
  }

  startEdit(product: any): void {
    this.editingId = product.id;
    this.editName = product.name;
    this.editDescription = product.description;
    this.editPrice = product.price;
    this.editStock = product.stock;
  }

  saveEdit(): void {
    if (this.editingId === null) return;

    this.productsService.update(this.editingId, {
      name: this.editName,
      description: this.editDescription,
      price: this.editPrice,
      stock: this.editStock
    }).subscribe({
      next: () => {
        this.editingId = null;
        this.productsService.getAll().subscribe({
          next: (data) => this.products.set(data)
        });
      },
      error: (err) => console.error('Error:', err)
    });
  }

  cancelEdit(): void {
    this.editingId = null;
  }
}