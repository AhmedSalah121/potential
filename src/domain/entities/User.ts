export interface UserProps {
  id?: string,
  firstName: string,
  lastName: string,
  email: string,
  role: UserRole,
  gender: Gender,
  age: number,
  phone: string,
  seekingPartner: boolean,
  preferredTime: WorkoutTime,
  isTrainer: boolean,
  hourlyRate: number,
  gymId: string,
  createdAt?: Date,
  updatedAt?: Date,
}

export class User {
  public id?: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public role: UserRole;
  public gender: Gender;
  public age: number;
  public phone: string;
  public seekingPartner: boolean;
  public preferredTime: WorkoutTime;
  public isTrainer: boolean;
  public hourlyRate: number;
  public gymId: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(u: UserProps) {
    this.id = u.id;
    this.firstName = u.firstName;
    this.lastName = u.lastName;
    this.email = u.email;
    this.role = u.role;
    this.gender = u.gender;
    this.age = u.age;
    this.phone = u.phone;
    this.seekingPartner = u.seekingPartner;
    this.preferredTime = u.preferredTime;
    this.isTrainer = u.isTrainer;
    this.hourlyRate = u.hourlyRate;
    this.gymId = u.gymId;
    this.createdAt = u.createdAt;
    this.updatedAt = u.updatedAt;
  }
}

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE'
}

export enum WorkoutTime {
  Morning = 'MORNING',
  Afternoon = 'AFTERNOON',
  Evening = 'EVENING',
  Any = 'ANY'
}

export enum UserRole {
  Admin = 'ADMIN',
  Trainer = 'TRAINER',
  Member = 'MEMBER'
}
