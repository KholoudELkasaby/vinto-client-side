import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShipmentService, ShipmentOrder } from '../../services/shipment.service';
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
  statusOptions: string[] = ['In-Proccess', 'In-Delivery', 'Reached'];
  
  // Filters
  startDate: string = '';
  endDate: string = '';
  searchTerm: string = '';
  selectedStatus: string = '';
  
  // Loading states
  isLoading: boolean = true;
  updatingId: string | null = null;

  constructor(
    private shipmentService: ShipmentService,
    private notificationService: NotificationService,
    private datePipe: DatePipe
  ) {}

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

  applyFilters(): void {
    this.filteredShipments = this.shipments.filter(shipment => {
      const shipmentDate = new Date(shipment.date);
      
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
    switch(status) {
      case 'In-Proccess': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'In-Delivery': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Reached': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  }
}