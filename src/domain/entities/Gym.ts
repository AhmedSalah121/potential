import { User } from "./User";

export interface GymProps {
    id?: string,
    name: string,
    address: string,
    members: User[],
    createdAt?: Date,
    updatedAt?: Date,
  }
  
  export class Gym {
    public id?: string;
    public name: string;
    public address: string;
    public members: User[];
    public createdAt?: Date;
    public updatedAt?: Date;
  
    constructor(g: GymProps) {
      this.id = g.id;
      this.name = g.name;
      this.address = g.address;
      this.members = g.members;
      this.createdAt = g.createdAt;
      this.updatedAt = g.updatedAt;
    }
  }
  