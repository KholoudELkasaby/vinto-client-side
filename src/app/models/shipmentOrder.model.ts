import { ShipmentInfo } from './shipmentInfo.model';
export interface ShipmentOrder {
  _id: string;
  cart: any;
  shipmentInfo: ShipmentInfo | null;
  status: string;
  dateOfOrder: string;
  dateOfDelivery: string;
}
