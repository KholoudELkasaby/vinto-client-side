import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShipmentService } from '../../services/shipment-management.service';
import { ShipmentOrder } from '../../models/shipmentOrder.model';
import { NotificationService } from '../../services/notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-shipment-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shipment-management.component.html',
  styleUrls: ['./shipment-management.component.css'],
  providers: [DatePipe]
})
export class ShipmentManagementComponent implements OnInit {
  shipments: ShipmentOrder[] = [];
  filteredShipments: ShipmentOrder[] = [];

  // Status options
  statusOptions: string[] = ['In-Proccess', 'In-Delivery', 'Reached'];

  // Filters
  startDate: string = '';
  endDate: string = '';
  searchTerm: string = '';
  selectedStatus: string = '';

  // Loading states
  isLoading: boolean = true;
  updatingId: string | null = null;
  updatingDeliveryDateId: string | null = null;

  constructor(
    private shipmentService: ShipmentService,
    private notificationService: NotificationService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadShipments();
  }

  loadShipments(): void {
    this.isLoading = true;
    this.shipmentService.getShipmentOrders().subscribe({
      next: (data) => {
        this.shipments = data;
        this.filteredShipments = [...data];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching shipments:', error);
        this.notificationService.showNotification({
          message: 'Failed to load shipments. Please try again.',
          type: 'error'
        });
        this.isLoading = false;
      }
    });
  }

  updateStatus(shipment: ShipmentOrder, newStatus: string): void {
    if (shipment.status === newStatus) return;
    if (shipment.status === 'Reached') {
      this.notificationService.showNotification({
        message: 'Cannot change status once shipment has reached its destination',
        type: 'warning'
      });
      return;
    }

    this.updatingId = shipment._id;

    this.shipmentService.updateShipmentStatus(shipment._id, newStatus).subscribe({
      next: () => {
        shipment.status = newStatus;
        this.notificationService.showNotification({
          message: `Shipment status updated to ${newStatus}`,
          type: 'success'
        });
        this.updatingId = null;
      },
      error: (error) => {
        console.error('Error updating status:', error);
        this.notificationService.showNotification({
          message: 'Failed to update shipment status',
          type: 'error'
        });
        this.updatingId = null;
      }
    });
  }

  updateDeliveryDate(shipment: ShipmentOrder): void {
    // Don't allow updating if status is "Reached"
    if (shipment.status === 'Reached') {
      this.notificationService.showNotification({
        message: 'Cannot update delivery date once shipment has reached destination',
        type: 'warning'
      });
      return;
    }

    // Check if deliveryDate exists before proceeding
    if (!shipment.dateOfDelivery) {
      this.notificationService.showNotification({
        message: 'Please select a valid delivery date',
        type: 'warning'
      });
      return;
    }

    // Check if date is valid (not before original date)
    const originalDate = new Date(shipment.dateOfOrder);
    const newDeliveryDate = new Date(shipment.dateOfDelivery);

    if (newDeliveryDate < originalDate) {
      this.notificationService.showNotification({
        message: 'Delivery date cannot be earlier than the order date',
        type: 'error'
      });
      // Reset to default value
      shipment.dateOfDelivery = this.formatDateTimeForInput(originalDate);
      return;
    }

    this.updatingDeliveryDateId = shipment._id;

    this.shipmentService.updateShipmentDeliveryDate(shipment._id, shipment.dateOfDelivery).subscribe({
      next: () => {
        this.notificationService.showNotification({
          message: 'Delivery date updated successfully',
          type: 'success'
        });
        this.updatingDeliveryDateId = null;
      },
      error: (error) => {
        console.error('Error updating delivery date:', error);
        this.notificationService.showNotification({
          message: 'Failed to update delivery date',
          type: 'error'
        });
        this.updatingDeliveryDateId = null;
      }
    });
  }

  applyFilters(): void {
    this.filteredShipments = this.shipments.filter(shipment => {
      const shipmentDate = new Date(shipment.dateOfOrder);

      // Filter by date range
      if (this.startDate && new Date(this.startDate) > shipmentDate) {
        return false;
      }

      if (this.endDate && new Date(this.endDate) < shipmentDate) {
        return false;
      }

      // Filter by status
      if (this.selectedStatus && shipment.status !== this.selectedStatus) {
        return false;
      }

      // Filter by search term (address or id)
      if (this.searchTerm) {
        const searchLower = this.searchTerm.toLowerCase();
        const hasAddress = shipment.shipmentInfo &&
          (shipment.shipmentInfo.city.toLowerCase().includes(searchLower) ||
            shipment.shipmentInfo.street.toLowerCase().includes(searchLower) ||
            shipment.shipmentInfo.state.toLowerCase().includes(searchLower));

        const matchesId = shipment._id.toLowerCase().includes(searchLower);

        if (!hasAddress && !matchesId) {
          return false;
        }
      }

      return true;
    });
  }

  resetFilters(): void {
    this.startDate = '';
    this.endDate = '';
    this.searchTerm = '';
    this.selectedStatus = '';
    this.filteredShipments = [...this.shipments];
  }

  getFormattedDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'MMM d, y, h:mm a') || dateString;
  }

  getPhoneDisplay(phones: string[] | undefined): string {
    if (!phones || phones.length === 0) return 'N/A';
    return phones.join(', ');
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'In-Proccess': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'In-Delivery': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Reached': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  }

  // Helper method to format the minimum date for datetime-local input
  getMinimumDateString(dateString: string): string {
    const date = new Date(dateString);
    return this.formatDateTimeForInput(date);
  }

  // Format date to datetime-local input format (YYYY-MM-DDThh:mm)
  formatDateTimeForInput(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}
