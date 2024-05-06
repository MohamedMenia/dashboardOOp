import { Shuttle, Taxi, DryClean } from "./Services";
import { User } from "./Users";
class DashboardFetures {
  constructor() {}

  //counting the percentage difference between the current month and the previous month
  private static countPercentageDifference = (x: any) => {
    let currentMonthCount = x.usersCountByMonth(new Date().getMonth());
    let previousMonthCount = x.usersCountByMonth(new Date().getMonth() - 1);
    const percentageDifference =
      previousMonthCount > 0
        ? ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100
        : 0;
    return percentageDifference.toFixed(2);
  };
  private static displaygraph() {
    //displaying the total reservations for the past 3 months and currunt
    for (let i = -3; i <= 0; i++) {
      console.log(
        Shuttle.totalReservationsPerMonth(new Date().getMonth() + i) +
        Taxi.totalReservationsPerMonth(new Date().getMonth() + i) +
        DryClean.totalReservationsPerMonth(new Date().getMonth() + i)
      );
    }
  }
  private static displayCountBox(x) {
    console.log(x.usersCountByMonth(new Date().getMonth()));
    console.log(`Percentage difference: ${DashboardFetures.countPercentageDifference(x)}%`);
  }
  private static displayUsersAndServicesCount() {
    //Users count by month
    DashboardFetures.displayCountBox(User);

    //Taxi Reservations count by month
    DashboardFetures.displayCountBox(Taxi);

    //shuttle Reservations count by month
    DashboardFetures.displayCountBox(Shuttle);

    //dry clean Reservations count by month
    DashboardFetures.displayCountBox(DryClean);
  }

  static dashboard() {
    DashboardFetures.displayUsersAndServicesCount();
    DashboardFetures.displaygraph();
  }
  static reservationAndTrips() {
    console.log(Taxi.retrieveReservations());
    User.bookTaxi();

    console.log(Shuttle.retrieveReservations());
    User.bookShuttle();

    console.log(DryClean.retrieveReservations());
    User.bookDryClean();
  }
  static reservationAndTripsDrafts() {
    console.log(Taxi.retrieveReservationsDrafts());
    console.log(DryClean.retrieveReservationsDrafts());
    console.log(Shuttle.retrieveReservationsDrafts());
  }

  sendMessage(subject: string, message: string, image: File): void {
    console.log(subject, message, image);
  }
}
