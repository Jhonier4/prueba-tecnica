import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumersService } from '../services/consumers.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consumers',
  imports: [CommonModule, FormsModule],
  templateUrl: './consumers.html',
  styleUrl: './consumers.css',
})
export class Consumers implements OnInit {
  consumers = signal<any[]>([]);
  newName: string = '';
  newEmail: string = '';

  constructor(private consumersService: ConsumersService) {}

  ngOnInit(): void {
    this.consumersService.getAll().subscribe({
      next: (data) => {
        this.consumers.set(data);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  createConsumer(): void {
  if (!this.newName || !this.newEmail) {
    return;
  }

  const newConsumer = {
    name: this.newName,
    email: this.newEmail
  };

  this.consumersService.create(newConsumer).subscribe({
    next: () => {
      this.newName = '';
      this.newEmail = '';
      this.consumersService.getAll().subscribe({
        next: (data) => {
          this.consumers.set(data);
        }
      });
    },
    error: (err) => {
      console.error('Error:', err);
    }
  });
}

deleteConsumer(id: number): void {
  this.consumersService.delete(id).subscribe({
    next: () => {
      this.consumersService.getAll().subscribe({
        next: (data) => this.consumers.set(data)
      });
    },
    error: (err) => console.error('Error:', err)
  });
}

editingId: number | null = null;
editName: string = '';
editEmail: string = '';

startEdit(consumer: any): void {
  this.editingId = consumer.id;
  this.editName = consumer.name;
  this.editEmail = consumer.email;
}

saveEdit(): void {
  if (this.editingId === null) return;

  this.consumersService.update(this.editingId, {
    name: this.editName,
    email: this.editEmail
  }).subscribe({
    next: () => {
      this.editingId = null;
      this.consumersService.getAll().subscribe({
        next: (data) => this.consumers.set(data)
      });
    },
    error: (err) => console.error('Error:', err)
  });
}

cancelEdit(): void {
  this.editingId = null;
}
}