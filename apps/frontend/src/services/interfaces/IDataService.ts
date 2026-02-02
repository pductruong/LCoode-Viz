export interface IDataService<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  search(query: string): Promise<T[]>;
}
