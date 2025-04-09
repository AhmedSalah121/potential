export interface Repository<T, O = unknown> {
  save(item: T[]): Promise<T[]>;
  fetch(options: O): Promise<T[]>;
  delete(id: string): Promise<void>;
}