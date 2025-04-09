import { Product } from '../entities/Product';
import { Repository } from './Repository';

export class ProductFetchOptions {
  get ids(): string[] | undefined {
    return this._ids;
  }

  set ids(value: string[]) {
    this._ids = value;
  }

  get categoryNames(): string[] | undefined {
    return this._categoryNames;
  }

  set categoryNames(value: string[]) {
    this._categoryNames = value;
  }

  get includeInactive(): boolean | undefined {
    return this._includeInactive;
  }

  set includeInactive(value: boolean) {
    this._includeInactive = value;
  }

  get limit(): number | undefined {
    return this._limit;
  }

  set limit(value: number) {
    this._limit = value;
  }

  get offset(): number | undefined {
    return this._offset;
  }

  set offset(value: number) {
    this._offset = value;
  }

  get maxPrice(): number | undefined {
    return this._maxPrice;
  }

  set maxPrice(value: number) {
    this._maxPrice = value;
  }

  private _ids?: string[];
  private _categoryNames?: string[];
  private _limit?: number;
  private _offset?: number;
  private _includeInactive?: boolean;
  private _maxPrice?: number;
}

export interface ProductRepository extends Repository<Product>{
  fetch(options: ProductFetchOptions): Promise<Product[]>;
  save(items: Product | Product[]): Promise<Product[]>;
  // delete(id: string): Promise<void>;
}
