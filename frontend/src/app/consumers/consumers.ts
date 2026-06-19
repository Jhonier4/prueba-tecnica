import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumersService } from '../services/consumers.service';

@Component({
  selector: 'app-consumers',
  imports: [CommonModule],
  templateUrl: './consumers.html',
  styleUrl: './consumers.css',
})
export class Consumers implements OnInit {
  consumers = signal<any[]>([]);

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
}