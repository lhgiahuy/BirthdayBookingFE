export interface OrderModel {
  hostId: string;
  guestId: string | null;
  placeId: string;
  serviceRequests: {
    id: string;
    quantity: number;
  }[];
  totalPrice: number;
  note: string;
  date: string;
}
