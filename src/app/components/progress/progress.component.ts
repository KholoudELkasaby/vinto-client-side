import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  imports: [],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  @Input() currentStatus: string = 'delivered';

  steps = [
    { id: 'ordered', label: 'Ordered' },
    { id: 'processing', label: 'Processing' },
    { id: 'out-for-delivery', label: 'Out for Delivery' },
    { id: 'delivered', label: 'Delivered' }
  ];

  isCompleted(index: number): boolean {
    return this.steps.findIndex(s => s.id === this.currentStatus) >= index;
  }

  isActive(index: number): boolean {
    return this.steps.findIndex(s => s.id === this.currentStatus) > index;
  }
}
