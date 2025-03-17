import { DebtHistory } from '../entities/debt-history';
import { Repository } from './repository';

export class DebtHistoryFetchOptions {
  get ids(): number[] | undefined {
    return this._ids;
  }

  set ids(value: number[]) {
    this._ids = value;
  }

  get year(): number | undefined {
    return this._year;
  }

  set year(value: number) {
    this._year = value;
  }

  private _ids: number[] | undefined;
  private _year: number | undefined;
}

export interface DebtHistoryRepository extends Repository<DebtHistory> {
  fetch(fetchOptions: DebtHistoryFetchOptions): Promise<DebtHistory[]>;

  save(items: DebtHistory[]): Promise<DebtHistory[]>;
}
