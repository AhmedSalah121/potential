export interface Repository<I, O = unknown> {
  fetch(fetchOptions: O): Promise<I[]>;

  save(items: I[]): Promise<I[]>;
}
