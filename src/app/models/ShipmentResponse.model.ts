import { ShipmentOrder } from "../models/shipmentOrder.model";

export interface ShipmentResponse {
  status: string;
  code: number;
  data: {
    shipmentOrder: ShipmentOrder[];
  };
  message: {
    text: string;
  };
}
