import { Repository } from './Repository';
import { Gym } from '../entities/Gym';

export class GymFetchOptions {
  private _ids?: string[];
  private _name?: string;
  private _address?: string;

  get ids() : string[] | undefined {
    return  this._ids;
  }

  set ids(value: string[]) {
    this._ids = value;
  }

  get name(): string | undefined {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get address(): string | undefined {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }
}

export interface GymRepository extends Repository<Gym> {
  save(gyms: Gym[]): Promise<Gym[]>;
  fetch(fetchOptions: GymFetchOptions): Promise<Gym[]>;
}
