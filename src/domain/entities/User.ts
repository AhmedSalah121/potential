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
  public id?: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public role: UserRole;
  public createdAt?: Date;
  public updatedAt?: Date;

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
