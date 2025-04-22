import { Repository } from './Repository';
import { User } from '../entities/User';

export class UserFetchOptions {
  private _ids?: string[];
  private _email?: string;

  get ids() : string[] | undefined {
    return  this._ids;
  }

  set ids(value: string[]) {
    this._ids = value;
  }

  get email(): string | undefined {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
}

export interface UserRepository extends Repository<User> {
  save(users: User[]): Promise<User[]>;
  fetch(fetchOptions: UserFetchOptions): Promise<User[]>;
}
