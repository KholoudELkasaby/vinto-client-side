import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-oreder-item',
  imports: [],
  templateUrl: './oreder-item.component.html',
  styleUrl: './oreder-item.component.css'
})
export class OrederItemComponent {
  @Input() cart: any;
  @Output() statusSelected = new EventEmitter<string>();
  selectedStatus: string | null = null;



  onStatusSelected(status: string): void {
    this.selectedStatus = status;
  }
  onItemClick(): void {
    this.statusSelected.emit(this.cart.status);
  }
}
