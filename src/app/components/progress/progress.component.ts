import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ShipmentService } from '../../services/shipment-management.service';

@Component({
  selector: 'app-progress',
  imports: [],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  @Input() status!: any;
  @Input() cartId!: any;
  @Input() cart!: any;
  @Output() goBack = new EventEmitter<void>();
  isLoaded = false;
  currentStatus: string = 'ordered';
  deliveryDate: string = '';

  steps = [
    {
      id: 'inprogress',
      label: 'Ordered',
      image: "delivery-car.png",
      message: "Your order has been placed successfully!",
      message2: "We are confirming your order details.",
    },
    {
      id: 'In-Proccess',
      label: 'Processing',
      image: "delivery-car.png",
      message: "Your order is being processed.",
      message2: "We're preparing your items for shipment."
    },
    {
      id: 'out-for-delivery',
      label: 'Out for Delivery',
      image: "delivery-car.png",
      message: "Your order is on its way!",
      message2: "Our delivery team is en route to your address."
    },
    {
      id: 'delivered',
      label: 'Delivered',
      image: "delivery-done.png",
      message: "Your order number Has Been Delivered successfully!",
      message2: "We hope you love your order! Let us know your feedback."
    }
  ]

  constructor(private getShipment: ShipmentService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    if (this.cartId) {
      this.getShipment.getShipmentOrderByCart(this.cartId).subscribe({
        next: (data) => {
          this.currentStatus = data.status;
          this.deliveryDate = data.dateOfDelivery;
          this.isLoaded = true;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching shipment:', err);
        }
      });
    } else {
      console.warn('No cart ID provided');
    }
  }

  getCurrentStep() {
    return this.steps.find(s => s.id === this.currentStatus);
  }

  isCompleted(index: number): boolean {
    return this.steps.findIndex(s => s.id === this.currentStatus) >= index;
  }

  isActive(index: number): boolean {
    return this.steps.findIndex(s => s.id === this.currentStatus) > index;
  }


  handleBack() {
    this.goBack.emit();
  }
}
