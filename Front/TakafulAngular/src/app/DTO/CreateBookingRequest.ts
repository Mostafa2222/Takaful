
export interface CreateBookingRequest {
  carId: string;
  addressId: string;
  bookingDate: string;
  timeSlot: string;
  packageId?: string;
  serviceIds?: string[];
  notes?: string;
}