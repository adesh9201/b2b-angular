export interface Shipment {
  date: string;
  shipmentId: string;
  courier: string;
  origin: string;
  destination: string;
  weight: string;
  status: 'Pending' | 'In Transit' | 'Delivered';
}
