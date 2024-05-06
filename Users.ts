export class User {
  static users: Array<{
    name: string;
    email: string;
    password: string;
    hotel: string;
    phone: string;
    role: "user" | "admin";
    createdOn: Date;
    userId: number;
  }> = [];

  private static nextUserId: number = 1; // Initialize with 1
  static register(
    name: string,
    email: string,
    password: string,
    hotel: string,
    phone: string,
    role: "user" | "admin"
  ): void {
    const newUser = {
      name,
      email,
      password,
      hotel,
      phone,
      role,
      createdOn: new Date(),
      userId: User.nextUserId++,
    };

    User.users.push(newUser);
  }

  static login(email: string, password: string) {
    const user = User.users.find((user) => user.email === email);
    user?.password === password ? user : {};
  }

  static updatePersonalInformation(
    email: string,
    newInfo: { name?: string; hotel?: string; phone?: string }
  ): void {}

  static bookTaxi(): void {}

  static bookShuttle(): void {}

  static bookDryClean(): void {}

  static usersCountByMonth(month: number): number {
    return User.users.filter((user) => {
      return user.createdOn.getMonth() === month;
    }).length;
  }
}
