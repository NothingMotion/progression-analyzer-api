interface ICrudDB<T> {
  create(data: T): Promise<T>;
  read(data: T): Promise<T>;
  readByQuery(query: object): Promise<T>;
  readAll(): Promise<T[]>;
  update(data: T): Promise<T>;
  delete(data: T): Promise<T>;
}

export { ICrudDB };
