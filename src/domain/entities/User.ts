export interface UserProps {
  id?: string,
  firstName: string,
  lastName: string,
  email: string,
  role: UserRole,
  createdAt?: Date,
  updatedAt?: Date,
}

export enum UserRole {
  Customer = 'CUSTOMER',
  Admin = 'ADMIN',
  Merchant = 'MERCHANT'
}

export class User {
  public readonly id?: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly role: UserRole;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(u: UserProps) {
    this.id = u.id;
    this.firstName = u.firstName;
    this.lastName = u.lastName;
    this.email = u.email;
    this.role = u.role;
    this.createdAt = u.createdAt;
    this.updatedAt = u.updatedAt;
  }
}
