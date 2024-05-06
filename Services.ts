interface Ipassengers {
  adults: number;
  children?: number;
  infants?: number;
}

interface IReservation {
  pickupLocation: string;
  pickupDate: Date;
  userId: string;
  price: number;
  paymentMethod: string;
}

interface ITaxiReservation extends IReservation {
  dropOff: string;
  passengers: Ipassengers;
  vehicleType: string;
}

interface IShuttleReservation extends IReservation {
  dropOff: string;
  passengers: Ipassengers;
}

interface IDryCleanReservation extends IReservation {
  totalItems: string[];
}

class ReservationService<T extends IReservation> {
  private reservations: T[] = [];
  private reservationsDrafts: T[] = [];

  book(userId: number, reservation: T, conform: boolean): void {
    if (conform) this.reservations.push(reservation);
    else this.reservationsDrafts.push(reservation);
  }

  retrieveReservations(): T[] {
    return this.reservations;
  }
  retrieveReservationsDrafts(): T[] {
    return this.reservationsDrafts;
  }

  reservationDetails(id: string): T | undefined {
    return this.reservations.find((reservation) => reservation.userId === id);
  }

  totalReservationsPerMonth(month: number): number {
    return this.reservations.filter((reservation) => {
      const date = new Date(reservation.pickupDate);
      return date.getMonth() === month;
    }).length;
  }
}

class TaxiService extends ReservationService<ITaxiReservation> {}
class ShuttleService extends ReservationService<IShuttleReservation> {}
class DryCleanService extends ReservationService<IDryCleanReservation> {}
export const Taxi = new TaxiService();
export const Shuttle = new ShuttleService();
export const DryClean = new DryCleanService();
